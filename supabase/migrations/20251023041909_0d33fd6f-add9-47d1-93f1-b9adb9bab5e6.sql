-- Creators table (extends profiles)
CREATE TABLE IF NOT EXISTS public.creators (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  legal_name TEXT,
  country_code CHAR(2),
  kyc_status TEXT CHECK (kyc_status IN ('unstarted','pending','approved','rejected')) DEFAULT 'unstarted',
  risk_score INTEGER DEFAULT 0,
  tax_id TEXT,
  tax_form_type TEXT,
  tax_status TEXT CHECK (tax_status IN ('unstarted','pending','verified')) DEFAULT 'unstarted',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Brands table
CREATE TABLE IF NOT EXISTS public.brands (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  org_name TEXT NOT NULL,
  billing_country CHAR(2) NOT NULL,
  kyb_status TEXT CHECK (kyb_status IN ('unstarted','pending','verified')) DEFAULT 'unstarted',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Campaigns table
CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL REFERENCES public.brands(user_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  budget_usd NUMERIC(14,2) NOT NULL,
  start_date DATE,
  end_date DATE,
  status TEXT CHECK (status IN ('draft','active','paused','completed')) DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Offers table
CREATE TABLE IF NOT EXISTS public.offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES public.creators(user_id) ON DELETE CASCADE,
  terms_json JSONB NOT NULL,
  escrow_amount_usd NUMERIC(14,2) NOT NULL,
  status TEXT CHECK (status IN ('proposed','accepted','in_progress','delivered','disputed','released')) DEFAULT 'proposed',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Payout methods table
CREATE TABLE IF NOT EXISTS public.payout_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES public.creators(user_id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('local_bank','usd_account','card')),
  details_json JSONB NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Payouts table
CREATE TABLE IF NOT EXISTS public.payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES public.creators(user_id) ON DELETE CASCADE,
  offer_id UUID REFERENCES public.offers(id),
  corridor TEXT NOT NULL,
  amount_usd NUMERIC(14,2) NOT NULL,
  fx_rate NUMERIC(18,6),
  fee_usd NUMERIC(14,2) DEFAULT 0,
  net_local NUMERIC(14,2),
  currency CHAR(3) NOT NULL,
  status TEXT CHECK (status IN ('quoted','initiated','processing','settled','failed')) DEFAULT 'quoted',
  initiated_at TIMESTAMPTZ,
  settled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- KYC records table
CREATE TABLE IF NOT EXISTS public.kyc_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider TEXT,
  status TEXT,
  reference TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Disputes table
CREATE TABLE IF NOT EXISTS public.disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  offer_id UUID NOT NULL REFERENCES public.offers(id) ON DELETE CASCADE,
  raiser_type TEXT CHECK (raiser_type IN ('creator','brand')),
  reason TEXT,
  evidence_json JSONB,
  status TEXT CHECK (status IN ('open','in_review','resolved','rejected')) DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Audit logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id BIGSERIAL PRIMARY KEY,
  actor UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  metadata JSONB,
  ip INET,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payout_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for creators
CREATE POLICY "Creators can view own profile"
  ON public.creators FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Creators can update own profile"
  ON public.creators FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Creators can insert own profile"
  ON public.creators FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Ops can view all creators"
  ON public.creators FOR SELECT
  USING (public.has_role(auth.uid(), 'ops') OR public.has_role(auth.uid(), 'compliance') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for brands
CREATE POLICY "Brands can view own profile"
  ON public.brands FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Brands can update own profile"
  ON public.brands FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Brands can insert own profile"
  ON public.brands FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Ops can view all brands"
  ON public.brands FOR SELECT
  USING (public.has_role(auth.uid(), 'ops') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for campaigns
CREATE POLICY "Brands can manage own campaigns"
  ON public.campaigns FOR ALL
  USING (brand_id = auth.uid());

CREATE POLICY "Creators can view campaigns with offers"
  ON public.campaigns FOR SELECT
  USING (id IN (SELECT campaign_id FROM public.offers WHERE creator_id = auth.uid()));

CREATE POLICY "Ops can view all campaigns"
  ON public.campaigns FOR SELECT
  USING (public.has_role(auth.uid(), 'ops') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for offers
CREATE POLICY "Creators can view own offers"
  ON public.offers FOR SELECT
  USING (creator_id = auth.uid());

CREATE POLICY "Brands can manage campaign offers"
  ON public.offers FOR ALL
  USING (campaign_id IN (SELECT id FROM public.campaigns WHERE brand_id = auth.uid()));

CREATE POLICY "Creators can update offer status"
  ON public.offers FOR UPDATE
  USING (creator_id = auth.uid());

-- RLS Policies for payout_methods
CREATE POLICY "Creators can manage own payout methods"
  ON public.payout_methods FOR ALL
  USING (creator_id = auth.uid());

-- RLS Policies for payouts
CREATE POLICY "Creators can view own payouts"
  ON public.payouts FOR SELECT
  USING (creator_id = auth.uid());

CREATE POLICY "Finance can view all payouts"
  ON public.payouts FOR SELECT
  USING (public.has_role(auth.uid(), 'finance') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Finance can manage payouts"
  ON public.payouts FOR ALL
  USING (public.has_role(auth.uid(), 'finance') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for KYC records
CREATE POLICY "Users can view own KYC records"
  ON public.kyc_records FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Compliance can manage all KYC records"
  ON public.kyc_records FOR ALL
  USING (public.has_role(auth.uid(), 'compliance') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for disputes
CREATE POLICY "Offer parties can view disputes"
  ON public.disputes FOR SELECT
  USING (
    offer_id IN (
      SELECT id FROM public.offers 
      WHERE creator_id = auth.uid() OR campaign_id IN (
        SELECT id FROM public.campaigns WHERE brand_id = auth.uid()
      )
    )
  );

CREATE POLICY "Offer parties can create disputes"
  ON public.disputes FOR INSERT
  WITH CHECK (
    offer_id IN (
      SELECT id FROM public.offers 
      WHERE creator_id = auth.uid() OR campaign_id IN (
        SELECT id FROM public.campaigns WHERE brand_id = auth.uid()
      )
    )
  );

CREATE POLICY "Ops can manage all disputes"
  ON public.disputes FOR ALL
  USING (public.has_role(auth.uid(), 'ops') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for audit_logs
CREATE POLICY "Admin can view audit logs"
  ON public.audit_logs FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "System can insert audit logs"
  ON public.audit_logs FOR INSERT
  WITH CHECK (true);

-- Triggers for updated_at
CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_offers_updated_at
  BEFORE UPDATE ON public.offers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_disputes_updated_at
  BEFORE UPDATE ON public.disputes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();