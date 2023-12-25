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
import { columns, downloadFormNop } from "@/services/form-nop";
import { FormNopTypes } from "@/services/data-types";
import DownloadIcon from "../Icons/Button/download-icon";
import axios from "axios";
import { formatRupiah } from "@/helpers/util";

const NewTable = (props: any) => {
  const {
    formNops,
    users,
    tokens,
    isloading,
    topContents,
    bottomContents,
    onDeleteModal,
  } = props;

  const handleDelete = useCallback(
    async (id: any) => {
      await onDeleteModal(id);
    },
    [onDeleteModal]
  );

  const handleClick = useCallback(async (id:any) => {
    try {
      const res = await downloadFormNop(id,users.isLogin,users.role);
      const base64EncodedPdf = res.data.pdf;
      const filename = res.data.filename;

      const pdfBlob = new Blob([Buffer.from(base64EncodedPdf, "base64")], {
        type: "application/pdf",
      });

      // Create a link to trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(pdfBlob);
      downloadLink.target = "_blank"; // Open the link in a new tab
      downloadLink.download = filename; // Use the filename from the response

      // Trigger the download by simulating click
      downloadLink.click();
    } catch (error) {
      console.log(error);
    }
  },[users])

  const renderCell = useCallback(
    (formNop: any, columnKey: any) => {
      const cellValue = formNop[columnKey];
      switch (columnKey) {
        case "no":
          return `${formNop.nop_id}`;
        case "prop_no":
          return `${formNop.proposals.prop_no}`;
        case "amount":
          return `${formatRupiah(formNop.amount)}`;
        case "cost_center":
          return `${formNop.get_amount.gl_acc.CostCenter}`;
        case "print_pdf":
          return (
            <div className="relative flex gap-2">
              <div className="flex items-center">
                <div>
                  <Button
                    className="bg-transparent text-md"
                    // as={Link}
                    startContent={<DownloadIcon size={20} fill="#17C964" />}
                    size="sm"
                    onClick={()=> {
                      handleClick(formNop.nop_id)
                    }}
                    // target="_blank"
                    // href={`http://p-api.test/form-nop/pdf?id=${formNop.nop_id}&isLogin=${users.isLogin}&role=${users.role}`}
                  >
                    Print
                  </Button>
                </div>
              </div>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex gap-2">
              <div className="flex items-center">
                <div>
                  <Button
                    startContent={<EditIcon size={20} fill="#17C964" />}
                    size="sm"
                    as={NextLink}
                    href={`/form-nop/e/${formNop.nop_id}`}
                    className="bg-transparent text-md"
                  >
                    Edit
                  </Button>
                </div>
                {/* <div>
                  <ModalDelete onDelete={() => handleDelete(formNop.nop_id)} />
                </div> */}
              </div>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [handleClick]
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
        items={formNops}
      >
        {(item: FormNopTypes) => (
          <TableRow key={item.nop_id}>
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
