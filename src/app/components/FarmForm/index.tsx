"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./validationSchema";
import { z } from "zod";
import Input from "../Input";
import { crops, states } from "../Select/options";
import Button from "../Button";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import {
  createProducer,
  closeForm,
  updateProducer,
} from "../../../../store/reducers/actions";
import SelectInput from "../Select";
import {
  getFormState,
  getProducers,
} from "../../../../store/reducers/selectors";
import generateUpdateData from "@/helpers/generateUpdateData";
import { DEFAULT_VALUE } from "./defaultValue";

type FormData = z.infer<typeof schema>;

interface IFarmFormProps {
  show?: boolean;
  onClose: () => void;
}

const FarmForm = ({ show, onClose }: IFarmFormProps) => {
  const selectedId = useSelector(getFormState)?.id;
  const producersData = useSelector(getProducers);
  const dispatch = useDispatch<AppDispatch>();

  const getDefaultData = () => {
    if (selectedId && producersData?.length) {
      const item = producersData.find(({ id }) => id === selectedId);
      const { created_at, updated_at, id, ...data } = item || {};
      return data || DEFAULT_VALUE;
    }
    return DEFAULT_VALUE;
  };
  const defaultValues = getDefaultData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [selectedId, reset]);

  const onSubmit = async (data: FormData) => {
    if (selectedId) {
      const updateData = generateUpdateData(defaultValues, data);
      dispatch(updateProducer({ id: selectedId, data: updateData }));
    } else {
      dispatch(createProducer(data));
    }
    dispatch(closeForm());
    reset();
  };

  const defaultState = getValues("state") || null;
  const defaultCrops = getValues("crops") || [];

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
          placeholder="City Name..."
          register={register}
          name="city"
          errors={errors}
        />
        <SelectInput
          label="State"
          register={register}
          name="state"
          options={states}
          errors={errors}
          defaultValue={defaultState}
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
        <SelectInput
          label="Crops"
          register={register}
          name="crops"
          options={crops}
          errors={errors}
          isMulti
          menuPlacement="top"
          defaultValue={defaultCrops}
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
