import React from "react";
import { FaPlus, FaEdit, FaTrash, FaSave, FaEye, FaArrowLeft } from "react-icons/fa";
import Button from "./Button";

/**
 * Botones predefinidos para acciones comunes.
 * Cada uno hereda las props de Button, así que puedes sobrescribir o añadir lo que quieras.
 */

export const AddButton = (props) => (
  <Button icon={FaPlus} variant="primary" {...props}>
    {props.children || "Añadir"}
  </Button>
);

export const EditButton = (props) => (
  <Button icon={FaEdit} variant="secondary" {...props}>
    {props.children || "Editar"}
  </Button>
);

export const DeleteButton = (props) => (
  <Button icon={FaTrash} variant="danger" {...props}>
    {props.children || "Eliminar"}
  </Button>
);

export const SaveButton = (props) => (
  <Button icon={FaSave} variant="primary" {...props}>
    {props.children || "Guardar"}
  </Button>
);

export const ViewButton = (props) => (
  <Button icon={FaEye} variant="outline" {...props}>
    {props.children || "Ver"}
  </Button>
);

export const BackButton = (props) => (
  <Button icon={FaArrowLeft} variant="outline" {...props}>
    {props.children || "Volver"}
  </Button>
);
