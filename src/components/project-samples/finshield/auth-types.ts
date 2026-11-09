// Source: PROJECTS/FINSHIELD_MANAGEMENT_FRONTEND/lib/types/auth.ts
// Presentation copied from the original; services are replaced with local fixtures.
export type UserRole =
  | "SUPER_ADMIN"
  | "ADMINISTRATOR"
  | "COMPANY_OWNER"
  | "BRANCH_MANAGER"
  | "CASHIER";

export type CurrentUser = {
  id: string;
  companyId: string | null;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  emailVerifiedAt?: string | null;
  totpEnabled?: boolean;
  preferredMfaMethod?: "EMAIL" | "AUTHENTICATOR";
  hasInvoiceSignature?: boolean;
  policyAcceptanceRequired?: boolean;
  legalAcceptanceRequired?: boolean;
  company?: {
    id: string;
    businessName: string;
    registeredName: string;
    tin: string;
    address: string;
    email: string;
    contactNumber?: string | null;
    selectedInvoiceTemplateId?: string | null;
    status: string;
    refundsEnabled?: boolean;
    isVatRegistered?: boolean | null;
  } | null;
  branches?: Array<{
    id: string;
    branchName: string;
    invoicePrefix: string;
    tin?: string | null;
    address?: string;
    email?: string | null;
    contactNumber?: string;
    status?: string;
  }>;
};

export type AuthSession = {
  accessToken: string;
  user: CurrentUser;
};
