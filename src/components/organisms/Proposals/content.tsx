import BreadCumbCustom from "@/components/atoms/Breadcumb";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HouseIcon } from "../Icons/breadcrumb/house-icon";
import Datepicker from "react-tailwindcss-datepicker";
import moment from "moment";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { SearchIcon } from "../Icons/Table/SearchIcon";
import {
  areaOptions,
  deleteProposalById,
  getProposal,
  getProposalAll,
  getProposalDateRange,
  skalaPrioritasOptions,
  statusColorMap,
  statusOptions,
} from "@/services/proposal";
import { capitalize } from "@/helpers/util";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "../Icons/Table/ChevronDownIcon";
import NewTable from "./NewTable";
import NextLink from "next/link";
import { getSelect2Area } from "@/services/area";
import { AreasTypes } from "@/services/data-types";

const ProposalContent = ({ tokens }: any) => {
  const router = useRouter();
  const [isloading, setLoading] = useState(false);
  const [proposals, setProposals] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [keyword, setKeyword] = useState("");

  const [optArea, setOptArea] = useState<any>([]);

  const [debounceValue] = useDebounce(keyword, 1000);

  const fetchAllProposal = useCallback(async () => {
    setLoading(true);

    const res = await getProposalAll(limit, page, debounceValue, tokens);
    const data = await res.data.result;

    setPage(data.current_page);
    setPages(data.total);
    setRows(data.per_page);
    setLastPage(data.last_page);

    setProposals(data.data);
    setLoading(false);
  }, [page, limit, debounceValue, tokens]);

  const fetchSelect2Area = useCallback(async () => {
    const res = await getSelect2Area(tokens);
    const data = await res.data.result;
    setOptArea(data);
  }, [tokens]);

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
    async (proposalId: any) => {
      try {
        await deleteProposalById(proposalId, tokens);
        const res = await getProposalAll(limit, page, keyword, tokens);
        const data = await res.data.result;

        setPage(data.current_page);
        setPages(data.total);
        setRows(data.per_page);
        setLastPage(data.last_page);
        setProposals(data.data);
        refreshData();
      } catch (error) {
        console.error("Error deleting proposal:", error);
      }
    },
    [keyword, limit, page, refreshData, tokens]
  );

  //Filter
  //status change
  const onStatusChange = useCallback(async (value: string) => {
    const response = await getProposal(value, "status");
    const data = await response.data.result;
    setPage(data.current_page);
    setPages(data.total);
    setRows(data.per_page);
    setLastPage(data.last_page);
    setProposals(data.data);
  }, []);
  //status change
  const onSkalaPrioritasChange = useCallback(async (value: string) => {
    const response = await getProposal(value, "skala_prioritas");
    const data = await response.data.result;
    setPage(data.current_page);
    setPages(data.total);
    setRows(data.per_page);
    setLastPage(data.last_page);
    setProposals(data.data);
  }, []);

  //area change
  const onAreaChange = useCallback(async (value: string) => {
    const response = await getProposal(value, "area");
    const data = await response.data.result;
    setPage(data.current_page);
    setPages(data.total);
    setRows(data.per_page);
    setLastPage(data.last_page);
    setProposals(data.data);
  }, []);

  //date range
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  //date range start & receive
  const handleDataRangeChange = useCallback(
    async (ctx: any) => {
      let start_date = moment(ctx.startDate).format("YYYY-MM-DD");
      let end_date = moment(ctx.endDate).format("YYYY-MM-DD");

      const date_range = {
        start_date,
        end_date,
      };

      const response = await getProposalDateRange(date_range, "date_range");
      const data = await response.data.result;
      setPage(data.current_page);
      setPages(data.total);
      setRows(data.per_page);
      setLastPage(data.last_page);
      setProposals(data.data);

      setValue(ctx);

      if (ctx.startDate === null && ctx.endDate === null) {
        fetchAllProposal();
      }
    },
    [fetchAllProposal]
  );

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
              placeholder="..."
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

  

  useEffect(() => {
    fetchAllProposal();
    fetchSelect2Area();
  }, [debounceValue, fetchAllProposal, fetchSelect2Area]);
  return (
    <>
      <div className="flex flex-col lg:flex-row pl-4 pr-6 lg:px-8 py-8 lg:items-center w-full lg:justify-between md:flex-row md:justify-between md:items-center gap-5">
        <BreadCumbCustom
          label="Dashboard"
          labelPage="Proposal"
          labelDetail="List"
          iconHome={<HouseIcon />}
          // iconPage={<FileTextIcons />}
        />
        <div className="w-full md:w-[18rem] lg:w-[18rem]">
          <Datepicker
            showShortcuts={true}
            placeholder={"Date Range Filter"}
            displayFormat={"DD/MM/YYYY"}
            //@ts-ignore
            value={value}
            onChange={handleDataRangeChange}
            inputClassName={`relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-default-200 border-1 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-xl tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-60 disabled:cursor-not-allowed focus:border-default-500 focus:ring-white`}
            toggleClassName={`absolute right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-75 disabled:cursor-not-allowed`}
          />
        </div>
      </div>
      <div className="pl-4 pr-6 lg:px-8 w-full max-w-full h-screen max-h-full">
        <div className="flex flex-col justify-center w-full lg:px-0 max-w-[90rem] mx-auto gap-3">
          <h3 className="text-xl font-semibold">All Proposal</h3>
          {/* <TableNew tokens={tokens} /> */}
          <div className="flex lg:items-center lg:justify-between w-full flex-col lg:flex-row md:flex-row md:items-center gap-4">
            <Button
              className="lg:text-sm text-lg h-[50px] lg:h-[34px] md:h-[34px] md:text-sm text-white"
              radius="sm"
              color="primary"
              as={NextLink}
              href="/proposal/c"
            >
              Pengajuan Proposal
            </Button>
            <div className="flex flex-col gap-4 items-center lg:flex-row md:flex-row justify-end w-full mt-4 mb-4">
              <span className="text-md md:hidden">Filter :</span>
              <Select
                placeholder="Skala Prioritas"
                variant="bordered"
                className="w-full lg:w-[14rem]"
                classNames={{
                  trigger: "border-1 border-gray-200 h-[38px] bg-white",
                  value: "text-default-700",
                }}
                // selectedKeys={[`${selectedKeysSkalaPrioritas}`]}
                onChange={(event: any) => {
                  onSkalaPrioritasChange(event.target.value);
                }}
              >
                {skalaPrioritasOptions.map((item) => (
                  <SelectItem
                    key={item.uid}
                    value={item.uid}
                    className={`capitalize ${statusColorMap[item.uid]}`}
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </Select>
              <Select
                placeholder="Status"
                variant="bordered"
                className="w-full lg:w-[14rem]"
                classNames={{
                  trigger: "border-1 border-gray-200 h-[38px] bg-white",
                  value: "text-default-700",
                }}
                // selectedKeys={[`${selectedKeysSkalaPrioritas}`]}
                onChange={(event: any) => {
                  onStatusChange(event.target.value);
                }}
              >
                {statusOptions.map((item) => (
                  <SelectItem
                    key={item.uid}
                    value={item.uid}
                    className={`capitalize ${statusColorMap[item.uid]}`}
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </Select>
              <Select
                placeholder="Area"
                variant="bordered"
                className="w-full lg:w-[14rem]"
                classNames={{
                  trigger: "border-1 border-gray-200 h-[38px] bg-white",
                  value: "text-default-700",
                }}
                // selectedKeys={[`${selectedKeysSkalaPrioritas}`]}
                onChange={(event: any) => {
                  // console.log(event.target.value)
                  onAreaChange(event.target.value);
                }}
              >
                {optArea.map((item: AreasTypes) => (
                  <SelectItem key={item.area_id} value={item.area_id}>
                    {item.area_name}
                  </SelectItem>
                ))}
                <SelectItem key="0" value="0">Other</SelectItem>
              </Select>
            </div>
          </div>

          <NewTable
            onDeleteModal={handleDelete}
            proposals={proposals}
            topContents={topContent}
            bottomContents={bottomContent}
          />
        </div>
      </div>
    </>
  );
};

export default ProposalContent;
