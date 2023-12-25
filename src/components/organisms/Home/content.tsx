import { Children, useCallback, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
  Skeleton,
  Link,
  Chip,
  DropdownTrigger,
  Button,
  DropdownItem,
  Dropdown,
  DropdownMenu,
  Select,
  SelectItem,
} from "@nextui-org/react";
import dynamic from "next/dynamic";
import CardTotalBudget from "./CardTotalBudget";
import { get } from "http";
import { getDashboard } from "@/services/dashboard";
import CardSisaBudget from "./CardSisaBudget";
import CardSkalaPrioritas from "./CardSkalaPrioritas";
import BreadCumbCustom from "@/components/atoms/Breadcumb";
import { HouseIcon } from "../Icons/breadcrumb/house-icon";
import SkeletonStatus from "./Skeleton/SkeletonStatus";
import SkeletonBudget from "./Skeleton/SkeletonBudget";
import SkeletonSkala from "./Skeleton/SkeletonSkala";
import { AmountTypes, ProposalTypes } from "@/services/data-types";
import { statusColorMap } from "@/services/proposal";
import { capitalize, formatRupiah } from "@/helpers/util";
import SkeletonTable from "./Skeleton/SkeletonTable";
import { ChevronDownIcon } from "../Icons/Table/ChevronDownIcon";
import SkeletonTableBudget from "./Skeleton/SkeletonBudgetTable";
import { getSelect2Amount } from "@/services/amount";
import { SelectComponent } from "@/components/atoms/Select";

const Chart = dynamic(
  () => import("../charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);

export const Content = (authToken: any) => {
  const [dataTotalBudgetMura, setDataTotalBudgetMura] = useState<any>([]);
  const [dataSisaBudgetMura, setDataSisaBudgetMura] = useState<any>([]);
  const [skalaPrioritasHigh, setSkalaPrioritasHigh] = useState<any>([]);
  const [skalaPrioritasMedium, setSkalaPrioritasMedium] = useState<any>([]);
  const [skalaPrioritasLow, setSkalaPrioritasLow] = useState<any>([]);
  const [statusProposal, setStatusProposal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [historyProposal, setHistoryProposal] = useState([]);

  const [amount, setAmount] = useState<any>([]);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);

    const res = await getDashboard(authToken.token, "");

    const data = res.data.result;

    setAmount(data.amount);
    // Mura Budget
    // setDataTotalBudgetMura(data.budget.budgetMura);
    // setDataSisaBudgetMura(data.budget.budgetMura);

    setSkalaPrioritasHigh(data.skalaPrioritas.high);
    setSkalaPrioritasMedium(data.skalaPrioritas.medium);
    setSkalaPrioritasLow(data.skalaPrioritas.low);

    setStatusProposal(data.status);

    setHistoryProposal(data.historyProposal);

    setLoading(false);
  }, [authToken]);

  const [year, setYear] = useState<any>([]);

  const select2Year = useCallback(async () => {
    const res = await getSelect2Amount(authToken.token, "");
    const data = res.data.result;

    setYear(data);
  }, [authToken]);

  const handleSelectYear = useCallback(
    async (ctx: any) => {
      setLoading(true);

      const res = await getDashboard(authToken.token, ctx);

      const data = res.data.result;

      console.log(data);

      setAmount(data.amount);
      // Mura Budget
      // setDataTotalBudgetMura(data.budget.budgetMura);
      // setDataSisaBudgetMura(data.budget.budgetMura);

      setSkalaPrioritasHigh(data.skalaPrioritas.high);
      setSkalaPrioritasMedium(data.skalaPrioritas.medium);
      setSkalaPrioritasLow(data.skalaPrioritas.low);

      setStatusProposal(data.status);

      setHistoryProposal(data.historyProposal);

      setLoading(false);
    },
    [authToken]
  );

  const topContentBudget = useMemo(() => {
    return (
      <>
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-xl font-semibold">Budget List</h3>
          <Link size="md" href="/amount" className="text-gray-500">
            See all
          </Link>
        </div>
      </>
    );
  }, []);
  const topContentHistory = useMemo(() => {
    return (
      <>
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-xl font-semibold">History List</h3>
          <Link size="md" href="/proposal" className="text-gray-500">
            See all
          </Link>
        </div>
      </>
    );
  }, []);

  useEffect(() => {
    fetchDashboard();
    select2Year();
  }, [fetchDashboard, select2Year]);

  return (
    <>
      {/* <div className="sticky top-0 bg-default-50 z-20 pb-3 pt-4">
        <div className="overflow-x-hidden relative ">
          <div className="flex flex-row px-8 items-center w-full h-[3rem]">
            <BreadCumbCustom
              label="Dashboard"
              dashboardOnly
              iconHome={<HouseIcon />}
            />
          </div>
        </div>
      </div> */}
      <div className="flex flex-col lg:flex-row pr-8 pl-4 lg:px-8 py-8 lg:items-center w-full lg:justify-between gap-5">
        <BreadCumbCustom
          label="Dashboard"
          dashboardOnly
          iconHome={<HouseIcon />}
        />
      </div>
      <div className="lg:px-8 pr-8 pl-4 w-full max-w-full h-screen max-h-full">
        <div className="flex flex-col justify-center w-full lg:px-0 pb-8 max-w-[90rem] mx-auto gap-3">
          <div className="gap-5 justify-center w-full">
            <div className="mt-6 gap-6 flex flex-col w-full">
              <div className="flex flex-col gap-5">
                {/* only view User Eksternal */}
                <div className="flex justify-between items-center gap-5 w-full">
                  <h3 className="text-xl font-semibold">Budget</h3>
                  <Select
                    variant="bordered"
                    placeholder="Years"
                    className="w-[200px]"
                    classNames={{
                      trigger: "h-[40px] bg-white",
                      value: "text-default-700",
                    }}
                    onChange={(e: any) => {
                      handleSelectYear(e.target.value);
                    }}
                  >
                    {year.map((item: any) => (
                      <SelectItem key={item.year} value={item.year}>
                        {item.year}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                {loading ? (
                  <SkeletonTableBudgetSection />
                ) : (
                  <Table
                    isStriped
                    shadow="sm"
                    // topContent={topContentBudget}
                    className="gap-5"
                  >
                    <TableHeader>
                      <TableColumn
                        className={`bg-green-400 text-[12px] text-default-900`}
                      >
                        BUDGET NAME
                      </TableColumn>
                      <TableColumn
                        className={`bg-green-400 text-[12px] text-default-900`}
                      >
                        CCOW NAME
                      </TableColumn>
                      <TableColumn
                        className={`bg-green-400 text-[12px] text-default-900`}
                      >
                        GL ACCOUNT
                      </TableColumn>
                      <TableColumn
                        className={`bg-green-400 text-[12px] text-default-900`}
                      >
                        AMOUNT
                      </TableColumn>
                      <TableColumn
                        className={`bg-green-400 text-[12px] text-default-900`}
                      >
                        SISA AMOUNT
                      </TableColumn>
                      <TableColumn
                        className={`bg-green-400 text-[12px] text-default-900`}
                      >
                        YEAR
                      </TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No Data Found"} items={amount}>
                      {(item: AmountTypes) => (
                        <TableRow key={item.amount_id}>
                          <TableCell>{item.BudgetName}</TableCell>
                          <TableCell>{item.CcowName}</TableCell>
                          <TableCell>{item.GLAccount}</TableCell>
                          <TableCell>{formatRupiah(item.amount)}</TableCell>
                          <TableCell>
                            {formatRupiah(item.sisa_amount)}
                          </TableCell>
                          <TableCell>{item.year}</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
                {/* Budget */}
                {/* <div className="grid md:grid-cols-4 grid-cols-1 2xl:grid-cols-4 gap-5  justify-center w-full">
                  {loading && <SkeletonBudgetSection visibleItemCount={4} />}
                  {!loading && (
                    <>
                      <CardTotalBudget
                        title="Total Budget"
                        data={dataTotalBudgetMura}
                      />
                      <CardTotalBudget
                        title="Total Budget"
                        data={dataTotalBudgetMura}
                      />
                      <CardTotalBudget
                        title="Total Budget"
                        data={dataTotalBudgetMura}
                      />
                      <CardTotalBudget
                        title="Total Budget"
                        data={dataTotalBudgetMura}
                      />
                    </>
                  )} 
                </div>*/}
                {/*<div className="grid md:grid-cols-4 grid-cols-1 2xl:grid-cols-4 gap-5  justify-center w-full">
                  {loading && <SkeletonBudgetSection visibleItemCount={4} />}
                   {!loading && (
                    <>
                      <CardSisaBudget
                        title="Sisa Budget"
                        data={dataSisaBudgetMura}
                      />
                      <CardSisaBudget
                        title="Sisa Budget"
                        data={dataSisaBudgetMura}
                      />
                      <CardSisaBudget
                        title="Sisa Budget"
                        data={dataSisaBudgetMura}
                      />
                      <CardSisaBudget
                        title="Sisa Budget"
                        data={dataSisaBudgetMura}
                      />
                    </>
                  )} 
                </div>*/}

                <h3 className="text-xl font-semibold mt-4">
                  Status & History Proposal
                </h3>
                {/* Skala Prioritas */}
                <div className="flex flex-col gap-5 lg:flex-row lg:gap-5">
                  <div className="lg:w-[30rem] grid md:grid-cols-1 grid-cols-1 2xl:grid-cols-1 gap-5 justify-center">
                    {loading && <SkeletonSkalaSection visibleItemCount={3} />}

                    {!loading && (
                      <>
                        <CardSkalaPrioritas
                          title="Skala Prioritas"
                          data={skalaPrioritasHigh}
                        />
                        <CardSkalaPrioritas
                          title="Skala Prioritas"
                          data={skalaPrioritasMedium}
                        />
                        <CardSkalaPrioritas
                          title="Skala Prioritas"
                          data={skalaPrioritasLow}
                        />
                      </>
                    )}
                  </div>
                  <div className="lg:w-[55rem]">
                    {loading ? (
                      <SkeletonStatus />
                    ) : (
                      <Card className="xl:max-w-full shadow-md px-3 w-full">
                        <CardBody className="py-3">
                          <h3 className="text-xl font-semibold">
                            Status Proposal
                          </h3>
                          <div className="flex gap-2.5">
                            <div className="flex flex-col">
                              {/* <span>Skala Prioritas</span> */}
                            </div>
                          </div>
                          <Chart statusData={statusProposal} />
                          <div className="flex flex-row justify-between gap-4 w-full">
                            <div className="flex flex-col">
                              <div className="flex flex-row items-center gap-2">
                                {statusProposal && (
                                  <>
                                    <div className="w-3 h-3 bg-blue-600 rounded" />
                                    <div className="flex lg:flex-row flex-col lg:gap-2">
                                      <span className="text-sm">
                                        {statusProposal.wait.name}
                                      </span>
                                      <span className="text-sm text-gray-400">
                                        ({statusProposal.wait.value})
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>
                              <div className="flex flex-row items-center gap-2">
                                {statusProposal && (
                                  <>
                                    <div className="w-3 h-3 bg-green-500 rounded" />
                                    <div className="flex lg:flex-row flex-col lg:gap-2">
                                      <span className="text-sm">
                                        {statusProposal.approve.name}
                                      </span>
                                      <span className="text-sm text-gray-400">
                                        ({statusProposal.approve.value})
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>

                              {/* <div className="flex flex-row items-center gap-2">
                            {statusProposal && (
                              <>
                                <div className="w-3 h-3 bg-yellow-500 rounded" />
                                <div className="flex lg:flex-row flex-col lg:gap-2">
                                  <span className="text-sm">
                                    {statusProposal.review.name}
                                  </span>
                                  <span className="text-sm text-gray-400">
                                    ({statusProposal.review.value})
                                  </span>
                                </div>
                              </>
                            )}
                          </div> */}
                              {/* <div className="flex flex-row items-center gap-2">
                            {statusProposal && (
                              <>
                                <div className="w-3 h-3 bg-rose-400 rounded" />
                                <div className="flex lg:flex-row flex-col lg:gap-2">
                                  <span className="text-sm">
                                    {statusProposal.delete.name}
                                  </span>
                                  <span className="text-sm text-gray-400">
                                    ({statusProposal.delete.value})
                                  </span>
                                </div>
                              </>
                            )}
                          </div> */}
                            </div>
                            <div className="flex flex-col">
                              <div className="flex flex-row items-center gap-2">
                                {statusProposal && (
                                  <>
                                    <div className="w-3 h-3 bg-rose-500 rounded" />
                                    <div className="flex lg:flex-row flex-col lg:gap-2">
                                      <span className="text-sm">
                                        {statusProposal.reject.name}
                                      </span>
                                      <span className="text-sm text-gray-400">
                                        ({statusProposal.reject.value})
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    )}
                  </div>
                  {loading ? (
                    <SkeletonTableSection />
                  ) : (
                    <Table
                      isStriped
                      shadow="sm"
                      topContentPlacement="outside"
                      topContent={topContentHistory}
                      className="gap-5"
                    >
                      <TableHeader>
                        <TableColumn
                          className={`bg-green-400 text-[12px] text-default-900`}
                        >
                          No Register
                        </TableColumn>
                        <TableColumn
                          className={`bg-green-400 text-[12px] text-default-900`}
                        >
                          JUDUL PROPOSAL
                        </TableColumn>
                        <TableColumn
                          className={`bg-green-400 text-[12px] text-center text-default-900`}
                        >
                          SKALA PRIORITAS
                        </TableColumn>
                        <TableColumn
                          className={`bg-green-400 text-[12px] text-center text-default-900`}
                        >
                          STATUS
                        </TableColumn>
                      </TableHeader>
                      <TableBody
                        emptyContent={"No Data Found"}
                        items={historyProposal}
                      >
                        {(item: ProposalTypes) => (
                          <TableRow key={item.prop_id}>
                            <TableCell>{item.prop_no}</TableCell>
                            <TableCell>{item.judul}</TableCell>
                            <TableCell className="text-center">
                              <Chip
                                className={`${
                                  statusColorMap[item.skala_prioritas]
                                }`}
                                // color={statusColorMap[proposal.status]}
                                size="sm"
                                variant="flat"
                              >
                                {capitalize(item.skala_prioritas)}
                              </Chip>
                            </TableCell>
                            <TableCell className="text-center">
                              <Chip
                                className={`${statusColorMap[item.status]}`}
                                // color={statusColorMap[proposal.status]}
                                size="sm"
                                variant="flat"
                              >
                                {capitalize(item.hasNameStatus)}
                              </Chip>
                            </TableCell>
                          </TableRow>
                        )}
                        {/* <TableRow>
                    <TableCell>PRP-2023-001</TableCell>
                    <TableCell>Proposal Pembangunan Jalan</TableCell>
                    <TableCell>High</TableCell>
                    <TableCell>Approved</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PRP-2023-001</TableCell>
                    <TableCell>Proposal Pembangunan Jalan</TableCell>
                    <TableCell>High</TableCell>
                    <TableCell>Approved</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PRP-2023-001</TableCell>
                    <TableCell>Proposal Pembangunan Jalan</TableCell>
                    <TableCell>High</TableCell>
                    <TableCell>Approved</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PRP-2023-001</TableCell>
                    <TableCell>Proposal Pembangunan Jalan</TableCell>
                    <TableCell>High</TableCell>
                    <TableCell>Approved</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PRP-2023-001</TableCell>
                    <TableCell>Proposal Pembangunan Jalan</TableCell>
                    <TableCell>High</TableCell>
                    <TableCell>Approved</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PRP-2023-001</TableCell>
                    <TableCell>Proposal Pembangunan Jalan</TableCell>
                    <TableCell>High</TableCell>
                    <TableCell>Approved</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PRP-2023-001</TableCell>
                    <TableCell>Proposal Pembangunan Jalan</TableCell>
                    <TableCell>High</TableCell>
                    <TableCell>Approved</TableCell>
                  </TableRow> */}
                      </TableBody>
                    </Table>
                  )}
                </div>
                {/* Pie/Donut */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

type SkeletonProps = {
  visibleItemCount?: number;
};

function SkeletonSkalaSection({
  visibleItemCount = Number.POSITIVE_INFINITY,
}: SkeletonProps) {
  const items = Array.from({ length: visibleItemCount }, (_, i) => i);
  return (
    <>
      {items.map((item) => (
        <SkeletonSkala key={item} />
      ))}
    </>
  );
}

function SkeletonBudgetSection({
  visibleItemCount = Number.POSITIVE_INFINITY,
}: SkeletonProps) {
  const items = Array.from({ length: visibleItemCount }, (_, i) => i);
  return (
    <>
      {items.map((item) => (
        <SkeletonBudget key={item} />
      ))}
    </>
  );
}

function SkeletonTableSection() {
  return (
    <>
      <SkeletonTable />
    </>
  );
}
function SkeletonTableBudgetSection() {
  return (
    <>
      <SkeletonTableBudget />
    </>
  );
}
