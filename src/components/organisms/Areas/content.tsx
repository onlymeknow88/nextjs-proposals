import BreadCumbCustom from "@/components/atoms/Breadcumb";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HouseIcon } from "../Icons/breadcrumb/house-icon";
import { Button, Input, Link, Pagination } from "@nextui-org/react";
import NewTable from "./NewTable";
import { useRouter } from "next/router";
import { useDebounce } from "use-debounce";
import { deleteArea, getAreaAll } from "@/services/area";
import { SearchIcon } from "../Icons/Table/SearchIcon";
import NextLink from "next/link";

const AreaContent = ({ tokens }: any) => {
  const router = useRouter();
  const [isloading, setLoading] = useState(false);
  const [areas, setAreas] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [keyword, setKeyword] = useState("");

  const [debounceValue] = useDebounce(keyword, 1000);

  const fetchAllArea = useCallback(async () => {
    setLoading(true);

    const res = await getAreaAll(limit, page, debounceValue, tokens);
    const data = await res.data.result;

    setPage(data.current_page);
    setPages(data.total);
    setRows(data.per_page);
    setLastPage(data.last_page);

    setAreas(data.data);
    setLoading(false);
  }, [limit, page, debounceValue, tokens]);

  //search
  const onSearchChange = useCallback(async (value: string) => {
    if (value) {
      setKeyword(value);
      setPage(1);
    } else {
      setKeyword("");
    }
  }, []);

  const onRowsPerPageChange = useCallback((e: any) => {
    setLimit(Number(e.target.value));
    setPage(0);
  }, []);

  //refresh data
  const refreshData = useCallback(() => {
    router.replace(router.asPath);
  }, [router]);

  //delete
  const handleDelete = useCallback(
    async (ID: any) => {
      try {
        console.log(ID);
        await deleteArea(ID, tokens);
        const res = await getAreaAll(limit, page, keyword, tokens);
        const data = await res.data.result;

        setPage(data.current_page);
        setPages(data.total);
        setRows(data.per_page);
        setLastPage(data.last_page);
        setAreas(data.data);
        refreshData();
      } catch (error) {
        console.error("Error deleting proposal:", error);
      }
    },
    [keyword, limit, page, refreshData, tokens]
  );

  useEffect(() => {
    fetchAllArea();
  }, [page, limit, keyword, fetchAllArea]);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex lg:flex-row flex-col justify-between lg:items-ends items-center">
          <span className="text-default-700 text-small">
            Rows per page:
            <select
              className="bg-white outline-none border-default-200 text-default-700 p-2 ml-2 border-1 rounded-xl"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="15">25</option>
            </select>
          </span>
          <div className="flex lg:flex-row flex-col justify-between items-center gap-3 mt-4 lg:mt-0">
            <Input
              isClearable
              className=" lg:w-auto ml-8 z-0"
              placeholder="search"
              startContent={<SearchIcon />}
              labelPlacement="outside-left"
              label="Search :"
              onClear={() => setKeyword("")}
              onValueChange={onSearchChange}
              value={keyword}
              classNames={{
                inputWrapper:
                  "border-1 border-default-200 bg-white focus-within:!bg-white data-[hover=true]:bg-default-100",
              }}
            />
          </div>
        </div>
      </div>
    );
  }, [onRowsPerPageChange, onSearchChange, keyword]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="text-default-700 text-small">
          Showing {page} to {rows} of {pages} Entries
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          size="md"
          className="text-white"
          //   isDisabled={hasSearchFilter}
          page={page}
          total={lastPage}
          variant="light"
          onChange={setPage}
          classNames={{
            wrapper: "flex items-center gap-2 bg-white shadow-md",
          }}
        />
      </div>
    );
  }, [page, pages, rows, lastPage]);

  return (
    <>
      <div className="flex flex-col lg:flex-row pl-0 pr-4 lg:px-8 py-8 lg:items-center w-full lg:justify-between md:flex-row md:justify-between md:items-center gap-5">
        <BreadCumbCustom
          label="Dashboard"
          labelPage="Area"
          iconHome={<HouseIcon />}
          isBreadcrumbList={false}
          isBreadcrumb={true}
        />
      </div>
      <div className="pl-0 pr-4 lg:px-8 w-full max-w-full h-screen max-h-full">
        <div className="flex flex-col justify-center w-full lg:px-0 max-w-[90rem] mx-auto gap-3">
          <h3 className="text-xl font-semibold">All Area</h3>
          <div className="flex lg:items-center lg:justify-between w-full flex-col lg:flex-row md:flex-row">
              <Button
                className="lg:text-sm text-lg h-[50px] lg:h-[34px] text-white md:h-[34px] md:text-sm"  
                color="primary"
                radius="sm"
                as={NextLink}
                href="/area/c"
              >
                Add
              </Button>
          </div>
          <NewTable
            tokens={tokens}
            areas={areas}
            topContents={topContent}
            bottomContents={bottomContent}
            onDeleteModal={handleDelete}
          />
        </div>
      </div>
    </>
  );
};

export default AreaContent;
