export interface LoginTypes {
  email: string;
  password: string;
}

export interface UserTypes {
  id: string;
  username: string;
  email: string;
  name: string;
}

export interface ProposalTypes {
  prop_id: string;
  prop_no: string;
  emp_name: string;
  judul: string;
  pengirim: string;
  perm_bantuan: any;
  skala_prioritas: string;
  area: AreasTypes;
  status: string;
  ass_proposal: any;
  start_date: string;
  receive_date: string;
  no_reg: string;
  jenis_bantuan: string;
  hasNameStatus: string;
  budget: BudgetsTypes;
  checklist_dokumen: any;
  sts_appr_deptHead: any;
  sts_appr_divHead: any;
  sts_appr_director: any;
}

export interface BudgetsTypes {
  budget_id: string;
  budget_name: string;
  ccow: CcowsTypes;
}

export interface AreasTypes {
  area_id: string;
  area_name: string;
}

export interface CcowsTypes {
  ccow_id: string;
  ccow_name: string;
  ccow_code: string;
  cost_center: string;
}

export interface GLAccTypes {
  gl_acc_id: string;
  ccow: CcowsTypes;
  gl_account: string;
  CostCenter: string;
  BudgetName: string;
  CcowName: string;
}

export interface AmountTypes {
  amount_id: string;
  gl_acc: GLAccTypes;
  amount: string;
  sisa_amount: string;
  year: string;
  CcowName: string;
  BudgetName: string;
  GLAccount: string;
}

export interface PurpayTypes {
  purpay_id: string;
  purpay_name: string;
}

export interface FormNopTypes {
  nop_id: string;
  nop_name: string;
  purpay: PurpayTypes;
  acc_name: string;
  provider: string;
  bank_name: string;
  get_amount: AmountTypes;
  amount: string;
  account_no: string;
  due_date: string;
  email: string;
  other_info: string;
  desc: string;
  explanation: string;
  proposals: ProposalTypes;
}
