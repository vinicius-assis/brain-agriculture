"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import {
  closeDeleteModal,
  deleteProducer,
} from "../../../../store/reducers/actions";
import { getDeleteModal } from "../../../../store/reducers/selectors";
import { Trash2, X } from "lucide-react";

const ConfirmRemoveModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { show, id } = useSelector(getDeleteModal);

  const handleClose = () => dispatch(closeDeleteModal());

  const handleRemove = () => {
    dispatch(deleteProducer(id!));
    handleClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="absolute top-0 flex justify-center pt-44 bg-black/40 w-full h-[100vh] z-10 overflow-hidden">
      <div className="p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <button
            data-testid="close-button"
            type="button"
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleClose}
          >
            <X />
            <span className="sr-only">Close modal</span>
          </button>
          <Trash2 className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
          <p className="mb-4 text-gray-500 dark:text-gray-300">
            Are you sure you want to delete this item?
          </p>
          <div className="flex justify-center items-center space-x-4">
            <button
              data-modal-toggle="deleteModal"
              type="button"
              className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={handleClose}
            >
              No, cancel
            </button>
            <button
              type="submit"
              className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
              onClick={handleRemove}
            >
              Yes, I&apos;m sure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRemoveModal;
