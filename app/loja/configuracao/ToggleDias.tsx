import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

type ToggleDiasProps = {
  field: {
    value: string[],
    onChange: (value: string[]) => void;
    onBlur: () => void;
  }    
}

export function ToggleDias({field}: ToggleDiasProps) {
  return (
    <ToggleGroup value={field.value} onValueChange={field.onChange} variant="outline" type="multiple">
      <ToggleGroupItem className="w-[14%]" value="domingo">
        Domingo
      </ToggleGroupItem>
      <ToggleGroupItem className="w-[14%]" value="segunda">
        Segunda
      </ToggleGroupItem>
      <ToggleGroupItem className="w-[14%]" value="terca">
        Terça
      </ToggleGroupItem>
      <ToggleGroupItem className="w-[14%]" value="quarta">
        Quarta
      </ToggleGroupItem>
      <ToggleGroupItem className="w-[14%]" value="quinta">
        Quinta
      </ToggleGroupItem>
      <ToggleGroupItem className="w-[14%]" value="sexta">
        Sexta
      </ToggleGroupItem>
      <ToggleGroupItem className="w-[14%]" value="sabado">
        Sábado
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
