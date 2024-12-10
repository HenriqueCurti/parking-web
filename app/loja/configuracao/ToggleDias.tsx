import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export function ToggleDias() {
  return (
    <ToggleGroup variant="outline" type="multiple">
      <ToggleGroupItem className="w-[14%]" value="underline" aria-label="Toggle underline">
        Domingo
      </ToggleGroupItem>
      <ToggleGroupItem className="w-[14%]" value="bold" aria-label="Toggle bold">
        Segunda
      </ToggleGroupItem>
      <ToggleGroupItem className="w-[14%]" value="italic" aria-label="Toggle italic">
        Terça
      </ToggleGroupItem>
      <ToggleGroupItem className="w-[14%]" value="underline" aria-label="Toggle underline">
        Quarta
      </ToggleGroupItem>
      <ToggleGroupItem className="w-[14%]" value="underline" aria-label="Toggle underline">
        Quinta
      </ToggleGroupItem>
      <ToggleGroupItem className="w-[14%]" value="underline" aria-label="Toggle underline">
        Sexta
      </ToggleGroupItem>
      <ToggleGroupItem className="w-[14%]" value="underline" aria-label="Toggle underline">
        Sábado
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
