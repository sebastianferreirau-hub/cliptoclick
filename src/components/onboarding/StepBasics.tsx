import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StepBasicsProps {
  data: any;
  updateData: (field: string, value: any) => void;
}

const StepBasics = ({ data, updateData }: StepBasicsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading mb-2">Información básica</h2>
        <p className="text-muted-foreground">Cuéntanos un poco sobre ti</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre completo</Label>
          <Input
            id="name"
            placeholder="María García"
            value={data.name}
            onChange={(e) => updateData("name", e.target.value)}
            className="bg-secondary/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="handle">Usuario / Handle</Label>
          <Input
            id="handle"
            placeholder="@mariagarcia"
            value={data.handle}
            onChange={(e) => updateData("handle", e.target.value)}
            className="bg-secondary/50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">País</Label>
            <Input
              id="country"
              placeholder="México"
              value={data.country}
              onChange={(e) => updateData("country", e.target.value)}
              className="bg-secondary/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lang">Idioma principal</Label>
            <Select value={data.lang} onValueChange={(val) => updateData("lang", val)}>
              <SelectTrigger className="bg-secondary/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepBasics;