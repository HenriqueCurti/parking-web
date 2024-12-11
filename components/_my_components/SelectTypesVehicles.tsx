import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectTypesVehiclesProps = {
  field: {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
  };
};

export function SelectTypesVehicles({ field }: SelectTypesVehiclesProps) {
  return (
    <Select
      value={field.value}
      onValueChange={field.onChange}
    >
      <SelectTrigger>
        <SelectValue placeholder="Selecione o tipo de veículo" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Veículos</SelectLabel>
          <SelectItem value="1">Moto</SelectItem>
          <SelectItem value="2">Carro</SelectItem>
          <SelectItem value="3">Caminhonete</SelectItem>
          <SelectItem value="4">Caminhão</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
