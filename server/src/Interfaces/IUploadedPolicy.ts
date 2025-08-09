// Interface for a user-uploaded policy, based on the 'uploaded_policies' table.
export interface IUploadedPolicy {
  policy_id: number;
  user_id: number;
  file_name: string;
  file_path: string;
  upload_date: Date;
  document_type?: string;
}
