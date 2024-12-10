import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectTypesVehicles() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Selecione o tipo de veículo" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Veículos</SelectLabel>
          <SelectItem value="1">Moto</SelectItem>
          <SelectItem value="2">Carro</SelectItem>
          <SelectItem value="3">Caminhote</SelectItem>
          <SelectItem value="4">Caminhão</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
