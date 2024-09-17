"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./validationSchema";
import { z } from "zod";
import Input from "../Input";
import Select from "../Select";
import { crops, states } from "../Select/options";
import Button from "../Button";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { createProducer } from "../../../../store/reducers/actions";

type FormData = z.infer<typeof schema>;

interface IFarmFormProps {
  show?: boolean;
  onClose: () => void;
}

const FarmForm = ({ show, onClose }: IFarmFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      crops: undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    dispatch(createProducer(data));
  };

  return (
    <div
      data-testid="farm-form"
      className={`w-full md:w-[500px] md:shadow-sm absolute h-[calc(100vh-104px)] bg-off-white z-10 left-0 top-[64px] pt-5 overflow-auto ${
        !show ? "-translate-x-[100%]" : "translate-x-[0]"
      } transition-all ease-out duration-300`}
    >
      <div className="absolute right-4 cursor-pointer" onClick={onClose}>
        <X />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-5">
        <Input
          label="Document"
          placeholder="CPF or CNPJ..."
          type="text"
          register={register}
          name="document"
          errors={errors}
        />
        <Input
          label="Profile Name"
          placeholder="Profile Name.."
          register={register}
          name="name"
          errors={errors}
        />
        <Input
          label="Farm Name"
          placeholder="Farm Name..."
          register={register}
          name="farmName"
          errors={errors}
        />
        <Input
          label="City"
          placeholder="Ciy Name..."
          register={register}
          name="city"
          errors={errors}
        />
        <Select
          label="State"
          register={register}
          name="state"
          options={states}
          errors={errors}
        />
        <Input
          label="Total Area"
          placeholder="Total area..."
          type="number"
          register={register}
          name="totalArea"
          errors={errors}
        />
        <Input
          label="Cultivable Area"
          placeholder="Cultivable Area..."
          type="number"
          register={register}
          name="cultivableArea"
          errors={errors}
        />
        <Input
          label="Vegetation Area"
          placeholder="Vegetation Area"
          type="number"
          register={register}
          name="vegetationArea"
          errors={errors}
        />
        <Select
          label="Crops Type"
          register={register}
          name="crops"
          options={crops}
          errors={errors}
        />
        <div className="flex justify-between">
          <Button
            className="bg-white !text-dark-green border border-solid border-dark-green"
            variant="sm"
            onClick={onClose}
          >
            Back
          </Button>
          <Button variant="sm" type="submit">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FarmForm;
