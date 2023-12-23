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
import { columns } from "@/services/amount";
import { AmountTypes } from "@/services/data-types";
import { formatRupiah } from "@/helpers/util";

const NewTable = (props: any) => {
  const { amounts, isloading, topContents, bottomContents, onDeleteModal } =
    props;

  console.log(amounts);
  const handleDelete = useCallback(
    async (id: any) => {
      await onDeleteModal(id);
    },
    [onDeleteModal]
  );

  const renderCell = useCallback(
    (amount: any, columnKey: any) => {
      const cellValue = amount[columnKey];
      switch (columnKey) {
        case "no":
          return `${amount.amount_id}`;
        case "gl_account":
          return `${amount.gl_acc.gl_account}`;
        case "cost_center":
          return `${amount.gl_acc.CostCenter}`;
        case "amount":
          return `${formatRupiah(amount.amount)}`;
        case "sisa_amount":
          return `${formatRupiah(amount.sisa_amount)}`;
        case "actions":
          return (
            <div className="relative flex gap-2">
              <div className="flex items-center">
                <div>
                  <Button
                    startContent={<EditIcon size={20} fill="#17C964" />}
                    size="sm"
                    as={NextLink}
                    href={`/amount/e/${amount.amount_id}`}
                    className="bg-transparent text-md"
                  >
                    Edit
                  </Button>
                </div>
                <div>
                  <ModalDelete
                    onDelete={() => handleDelete(amount.amount_id)}
                  />
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
        items={amounts}
      >
        {(item: AmountTypes) => (
          <TableRow key={item.amount_id}>
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
