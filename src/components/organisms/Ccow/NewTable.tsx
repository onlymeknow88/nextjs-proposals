import { columns } from "@/services/ccow";
import { CcowsTypes } from "@/services/data-types";
import {
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useCallback } from "react";
import { EditIcon } from "../Icons/Table/edit-icon";
import NextLink from "next/link";
import { ModalDelete } from "@/components/molecules/ButtonDelete";

const NewTable = (props: any) => {
  const { ccows, isloading, topContents, bottomContents, onDeleteModal } =
    props;
  const handleDelete = useCallback(
    async (id: any) => {
      await onDeleteModal(id);
    },
    [onDeleteModal]
  );

  const renderCell = useCallback(
    (ccow: any, columnKey: any) => {
      const cellValue = ccow[columnKey];
      switch (columnKey) {
        case "no":
          return `${ccow.ccow_id}`;
        case "ccow_name":
          return `${ccow.ccow_name}`;
        case "actions":
          return (
            <div className="relative flex gap-2">
              <div className="flex items-center">
                <div>
                  <Button
                    startContent={<EditIcon size={20} fill="#17C964" />}
                    size="sm"
                    as={NextLink}
                    href={`/ccow/e/${ccow.ccow_id}`}
                    className="bg-transparent text-md"
                  >
                    Edit
                  </Button>
                </div>
                <div>
                  <ModalDelete onDelete={() => handleDelete(ccow.ccow_id)} />
                </div>
              </div>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [handleDelete]
  );
  return (
    <Table
      bottomContent={bottomContents}
      topContent={topContents}
      topContentPlacement="outside"
      bottomContentPlacement="outside"
      isStriped
      isCompact
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            className={`bg-green-400 text-[12px] text-default-900 ${
              column.uid == "actions" ? "!text-center" : ""
            }`}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"No data found"}
        isLoading={isloading}
        items={ccows}
      >
        {(item: CcowsTypes) => (
          <TableRow key={item.ccow_id}>
            {(columnKey) => (
              <TableCell
                className={` ${columnKey === "actions" ? "w-5" : ""} ${
                  columnKey === "no" ? "w-5" : ""
                }`}
              >
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default NewTable;
