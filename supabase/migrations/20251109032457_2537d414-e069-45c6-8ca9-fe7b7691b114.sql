-- Remove OneDrive connection and add Google Drive and Facebook connections
ALTER TABLE profiles 
  DROP COLUMN IF EXISTS onedrive_connected,
  ADD COLUMN IF NOT EXISTS google_drive_connected BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS facebook_connected BOOLEAN DEFAULT FALSE;