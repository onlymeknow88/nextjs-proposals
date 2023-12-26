import { ProposalTypes } from "@/services/data-types";
import { columns, statusColorMap } from "@/services/proposal";
import {
  Button,
  Chip,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import NextLink from "next/link";

import React, { useCallback } from "react";
import { EditIcon } from "../Icons/Table/edit-icon";
import moment from "moment";
import { capitalize } from "@/helpers/util";
import { ModalDelete } from "@/components/molecules/ButtonDelete";

const NewTable = (props: any) => {
  const { proposals, isloading, topContents, bottomContents, onDeleteModal } =
    props;

  const handleDelete = useCallback(
    async (id: any) => {
      await onDeleteModal(id);
    },
    [onDeleteModal]
  );

  const renderCell = useCallback(
    (proposal: any, columnKey: any) => {
      const cellValue = proposal[columnKey];
      switch (columnKey) {
        case "status":
          return (
            <Chip
              className={`${statusColorMap[proposal.status]}`}
              // color={statusColorMap[proposal.status]}
              size="sm"
              variant="flat"
            >
              {capitalize(proposal.hasNameStatus)}
            </Chip>
          );
        case "prop_no":
          return (
            <NextLink
              href={`/proposal/d/${proposal.prop_id}`}
              className="text-primary-500 underline"
            >
              {cellValue}
            </NextLink>
          );
        case "tgl_pengajuan":
          return (
            <span>{moment(proposal.tgl_pengajuan).format("DD MMM YYYY")}</span>
          );
        case "created_by":
          return <span>{capitalize(proposal.emp_name)}</span>;
        case "skala_prioritas":
          return (
            <Chip
              className={`capitalize ${
                statusColorMap[proposal.skala_prioritas]
              }`}
              size="sm"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <div className="flex items-center">
                <div>
                  <Button
                    startContent={<EditIcon size={20} fill="#17C964" />}
                    size="sm"
                    as={NextLink}
                    href={`/proposal/e/${proposal.prop_id}`}
                    className="bg-transparent text-md"
                  >
                      Edit
                  </Button>
                </div>
                <div>
                  <ModalDelete
                    onDelete={() => handleDelete(proposal.prop_id)}
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
            } ${column.uid == "status" ? "!text-center" : ""}  ${
              column.uid == "skala_prioritas" ? "!text-center" : ""
            }
              ${column.uid == "prop_no" ? "lg:w-[10rem] !text-center" : ""}
              ${column.uid == "judul" ? "!text-center" : ""}
              `}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"No data found"}
        isLoading={isloading}
        items={proposals}
      >
        {(item: ProposalTypes) => (
          <TableRow key={item.prop_id}>
            {(columnKey) => (
              <TableCell
                className={`${
                  columnKey === "judul" ? "!text-start" : "text-center"
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
