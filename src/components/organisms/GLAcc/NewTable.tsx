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
import { columns } from "@/services/gl-acc";
import { GLAccTypes } from "@/services/data-types";
import { downloadFormNop } from "@/services/form-nop";

const NewTable = (props: any) => {
  const { glAccs, isloading, topContents, bottomContents, onDeleteModal } =
    props;
  const handleDelete = useCallback(
    async (id: any) => {
      await onDeleteModal(id);
    },
    [onDeleteModal]
  );

 

  const renderCell = useCallback(
    (glAcc: any, columnKey: any) => {
      const cellValue = glAcc[columnKey];
      switch (columnKey) {
        case "no":
          return `${glAcc.gl_acc_id}`;
        case "gl_account":
          return `${glAcc.gl_account}`;
        case "ccow_code":
          return `${glAcc.ccow.ccow_code}`;
        case "cost_center":
          return `${glAcc.CostCenter}`;
        case "actions":
          return (
            <div className="relative flex gap-2">
              <div className="flex items-center">
                <div>
                  <Button
                    startContent={<EditIcon size={20} fill="#17C964" />}
                    size="sm"
                    as={NextLink}
                    href={`/gl-account/e/${glAcc.gl_acc_id}`}
                    className="bg-transparent text-md"
                  >
                    Edit
                  </Button>
                </div>
                <div>
                  <ModalDelete onDelete={() => handleDelete(glAcc.gl_acc_id)} />
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
        items={glAccs}
      >
        {(item: GLAccTypes) => (
          <TableRow key={item.gl_acc_id}>
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
