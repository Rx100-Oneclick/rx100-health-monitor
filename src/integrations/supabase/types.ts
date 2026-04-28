export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      aggregation_run_log: {
        Row: {
          completed_at: string | null
          error_message: string | null
          execution_time_ms: number | null
          id: string
          rows_processed: number | null
          run_type: string
          started_at: string
          status: string
        }
        Insert: {
          completed_at?: string | null
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          rows_processed?: number | null
          run_type: string
          started_at?: string
          status?: string
        }
        Update: {
          completed_at?: string | null
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          rows_processed?: number | null
          run_type?: string
          started_at?: string
          status?: string
        }
        Relationships: []
      }
      api_health_metrics: {
        Row: {
          captured_at: string
          endpoint: string
          error_rate: number | null
          is_success: boolean
          latency_ms: number
          metadata: Json | null
          method: string
          metric_id: string
          request_id: string | null
          rps: number | null
          status_code: number | null
          tenant_id: string
          trace_id: string | null
        }
        Insert: {
          captured_at?: string
          endpoint: string
          error_rate?: number | null
          is_success?: boolean
          latency_ms: number
          metadata?: Json | null
          method: string
          metric_id?: string
          request_id?: string | null
          rps?: number | null
          status_code?: number | null
          tenant_id: string
          trace_id?: string | null
        }
        Update: {
          captured_at?: string
          endpoint?: string
          error_rate?: number | null
          is_success?: boolean
          latency_ms?: number
          metadata?: Json | null
          method?: string
          metric_id?: string
          request_id?: string | null
          rps?: number | null
          status_code?: number | null
          tenant_id?: string
          trace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_health_metrics_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      app_categories: {
        Row: {
          created_at: string | null
          is_active: boolean | null
          name: string
          updated_at: string | null
          uuid: string
        }
        Insert: {
          created_at?: string | null
          is_active?: boolean | null
          name: string
          updated_at?: string | null
          uuid?: string
        }
        Update: {
          created_at?: string | null
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
          uuid?: string
        }
        Relationships: []
      }
      app_code_sequences: {
        Row: {
          next_sequence: number
          tenant_id: string
        }
        Insert: {
          next_sequence: number
          tenant_id: string
        }
        Update: {
          next_sequence?: number
          tenant_id?: string
        }
        Relationships: []
      }
      app_legal_documents: {
        Row: {
          app_id: string
          created_at: string | null
          created_by: string
          document_id: string
          is_mandatory: boolean | null
          tenant_id: string
          updated_at: string | null
          uuid: string
        }
        Insert: {
          app_id: string
          created_at?: string | null
          created_by: string
          document_id: string
          is_mandatory?: boolean | null
          tenant_id: string
          updated_at?: string | null
          uuid?: string
        }
        Update: {
          app_id?: string
          created_at?: string | null
          created_by?: string
          document_id?: string
          is_mandatory?: boolean | null
          tenant_id?: string
          updated_at?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "app_legal_documents_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "applications_registry"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "app_legal_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "legal_documents"
            referencedColumns: ["document_id"]
          },
          {
            foreignKeyName: "app_legal_documents_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      app_registry: {
        Row: {
          active: boolean | null
          app_id: string
          app_key: string | null
          app_name: string | null
          app_type: string | null
          capability: string | null
          target_url: string | null
        }
        Insert: {
          active?: boolean | null
          app_id?: string
          app_key?: string | null
          app_name?: string | null
          app_type?: string | null
          capability?: string | null
          target_url?: string | null
        }
        Update: {
          active?: boolean | null
          app_id?: string
          app_key?: string | null
          app_name?: string | null
          app_type?: string | null
          capability?: string | null
          target_url?: string | null
        }
        Relationships: []
      }
      app_role_permissions: {
        Row: {
          created_at: string | null
          permission_id: string
          role_id: string
        }
        Insert: {
          created_at?: string | null
          permission_id: string
          role_id: string
        }
        Update: {
          created_at?: string | null
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "app_role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "module_permissions"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "app_role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "application_roles"
            referencedColumns: ["uuid"]
          },
        ]
      }
      application_owners: {
        Row: {
          app_id: string
          created_at: string | null
          created_by: string
          effective_from: string | null
          effective_untill: string | null
          is_active: boolean | null
          role: string
          tenant_id: string
          updated_at: string | null
          user_id: string
          uuid: string
        }
        Insert: {
          app_id: string
          created_at?: string | null
          created_by?: string
          effective_from?: string | null
          effective_untill?: string | null
          is_active?: boolean | null
          role: string
          tenant_id: string
          updated_at?: string | null
          user_id: string
          uuid?: string
        }
        Update: {
          app_id?: string
          created_at?: string | null
          created_by?: string
          effective_from?: string | null
          effective_untill?: string | null
          is_active?: boolean | null
          role?: string
          tenant_id?: string
          updated_at?: string | null
          user_id?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_owners_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "applications_registry"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "application_owners_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      application_plan: {
        Row: {
          app_id: string
          app_plan_id: string
          created_at: string | null
          created_by: string
          is_active: boolean
          plan_template_id: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          app_id: string
          app_plan_id?: string
          created_at?: string | null
          created_by: string
          is_active?: boolean
          plan_template_id: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          app_id?: string
          app_plan_id?: string
          created_at?: string | null
          created_by?: string
          is_active?: boolean
          plan_template_id?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "application_plan_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "applications_registry"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "application_plan_plan_template_id_fkey"
            columns: ["plan_template_id"]
            isOneToOne: false
            referencedRelation: "plan_templates"
            referencedColumns: ["plan_template_id"]
          },
          {
            foreignKeyName: "application_plan_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      application_roles: {
        Row: {
          application_id: string
          created_at: string | null
          role_name: string
          tenant_id: string
          uuid: string
        }
        Insert: {
          application_id: string
          created_at?: string | null
          role_name: string
          tenant_id: string
          uuid?: string
        }
        Update: {
          application_id?: string
          created_at?: string | null
          role_name?: string
          tenant_id?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_roles_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications_registry"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "application_roles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      application_user_permissions: {
        Row: {
          application_id: string
          archived: boolean | null
          created_at: string | null
          organization_id: string
          organization_member_id: string
          permission_jsonb: Json
          permission_matrix_id: string
          updated_at: string | null
          uuid: string
        }
        Insert: {
          application_id: string
          archived?: boolean | null
          created_at?: string | null
          organization_id: string
          organization_member_id: string
          permission_jsonb: Json
          permission_matrix_id: string
          updated_at?: string | null
          uuid?: string
        }
        Update: {
          application_id?: string
          archived?: boolean | null
          created_at?: string | null
          organization_id?: string
          organization_member_id?: string
          permission_jsonb?: Json
          permission_matrix_id?: string
          updated_at?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_user_permissions_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "application_user_permissions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "application_user_permissions_organization_member_id_fkey"
            columns: ["organization_member_id"]
            isOneToOne: false
            referencedRelation: "organization_members"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "application_user_permissions_permission_matrix_id_fkey"
            columns: ["permission_matrix_id"]
            isOneToOne: false
            referencedRelation: "permission_matrix"
            referencedColumns: ["uuid"]
          },
        ]
      }
      applications: {
        Row: {
          application_name: string
          application_static_id: string
          archived: boolean | null
          created_at: string | null
          updated_at: string | null
          uuid: string
        }
        Insert: {
          application_name: string
          application_static_id: string
          archived?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          uuid?: string
        }
        Update: {
          application_name?: string
          application_static_id?: string
          archived?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          uuid?: string
        }
        Relationships: []
      }
      applications_modules: {
        Row: {
          app_id: string
          created_at: string | null
          created_by: string
          description: string | null
          module_name: string
          status: string
          tenant_id: string
          updated_at: string | null
          uuid: string
        }
        Insert: {
          app_id: string
          created_at?: string | null
          created_by?: string
          description?: string | null
          module_name: string
          status: string
          tenant_id: string
          updated_at?: string | null
          uuid?: string
        }
        Update: {
          app_id?: string
          created_at?: string | null
          created_by?: string
          description?: string | null
          module_name?: string
          status?: string
          tenant_id?: string
          updated_at?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_modules_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "applications_registry"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "applications_modules_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      applications_registry: {
        Row: {
          app_category: string | null
          app_code: string
          app_id: string
          app_name: string
          app_type: string
          created_at: string | null
          created_by: string
          criticality: string | null
          data_sensitivity: string | null
          description: string
          favicon_url: string | null
          owning_org_unit_id: string | null
          status: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          app_category?: string | null
          app_code: string
          app_id?: string
          app_name: string
          app_type: string
          created_at?: string | null
          created_by?: string
          criticality?: string | null
          data_sensitivity?: string | null
          description: string
          favicon_url?: string | null
          owning_org_unit_id?: string | null
          status: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          app_category?: string | null
          app_code?: string
          app_id?: string
          app_name?: string
          app_type?: string
          created_at?: string | null
          created_by?: string
          criticality?: string | null
          data_sensitivity?: string | null
          description?: string
          favicon_url?: string | null
          owning_org_unit_id?: string | null
          status?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_registry_app_category_fkey"
            columns: ["app_category"]
            isOneToOne: false
            referencedRelation: "app_categories"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "applications_registry_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      approval_evidence_export_files: {
        Row: {
          created_at: string
          export_job_id: string
          file_id: string
          file_name: string
          file_size_bytes: number | null
          file_type: string
          file_url: string
          tenant_id: string
        }
        Insert: {
          created_at?: string
          export_job_id: string
          file_id?: string
          file_name: string
          file_size_bytes?: number | null
          file_type: string
          file_url: string
          tenant_id: string
        }
        Update: {
          created_at?: string
          export_job_id?: string
          file_id?: string
          file_name?: string
          file_size_bytes?: number | null
          file_type?: string
          file_url?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "approval_evidence_export_files_export_job_id_fkey"
            columns: ["export_job_id"]
            isOneToOne: false
            referencedRelation: "approval_evidence_export_jobs"
            referencedColumns: ["export_job_id"]
          },
          {
            foreignKeyName: "approval_evidence_export_files_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      approval_evidence_export_jobs: {
        Row: {
          completed_at: string | null
          created_at: string
          date_from: string
          date_to: string
          export_format: string
          export_job_id: string
          hash_chain_reference: string | null
          integrity_verification: string
          job_code: string
          ledger_seal_reference: string | null
          reason_for_export: string
          record_count: number
          requested_at: string
          requested_by: string
          status: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          date_from: string
          date_to: string
          export_format: string
          export_job_id?: string
          hash_chain_reference?: string | null
          integrity_verification?: string
          job_code: string
          ledger_seal_reference?: string | null
          reason_for_export: string
          record_count?: number
          requested_at?: string
          requested_by: string
          status?: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          date_from?: string
          date_to?: string
          export_format?: string
          export_job_id?: string
          hash_chain_reference?: string | null
          integrity_verification?: string
          job_code?: string
          ledger_seal_reference?: string | null
          reason_for_export?: string
          record_count?: number
          requested_at?: string
          requested_by?: string
          status?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "approval_evidence_export_jobs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      approval_ledger: {
        Row: {
          approval_action: string | null
          approval_id: string
          approval_timestamp: string | null
          approver_id: string
          conditions: Json | null
          justification: string | null
          tenant_id: string
          transaction_id: string | null
        }
        Insert: {
          approval_action?: string | null
          approval_id?: string
          approval_timestamp?: string | null
          approver_id: string
          conditions?: Json | null
          justification?: string | null
          tenant_id: string
          transaction_id?: string | null
        }
        Update: {
          approval_action?: string | null
          approval_id?: string
          approval_timestamp?: string | null
          approver_id?: string
          conditions?: Json | null
          justification?: string | null
          tenant_id?: string
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "approval_ledger_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "approval_ledger_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["transaction_id"]
          },
        ]
      }
      approval_request_ledger: {
        Row: {
          app_id: string | null
          approve_type: string
          approver_details_logs: Json | null
          attachments: string[] | null
          created_at: string
          created_by: string
          priority: string | null
          product_details: Json
          request_code: string
          request_id: string
          status: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          app_id?: string | null
          approve_type: string
          approver_details_logs?: Json | null
          attachments?: string[] | null
          created_at?: string
          created_by: string
          priority?: string | null
          product_details: Json
          request_code: string
          request_id?: string
          status?: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          app_id?: string | null
          approve_type?: string
          approver_details_logs?: Json | null
          attachments?: string[] | null
          created_at?: string
          created_by?: string
          priority?: string | null
          product_details?: Json
          request_code?: string
          request_id?: string
          status?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "approval_request_ledger_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "applications_registry"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "approval_request_ledger_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      approval_template_scope: {
        Row: {
          created_at: string
          created_by: string
          scope_reference_id: string | null
          scope_type: string
          template_id: string
          tenant_id: string
          uuid: string
        }
        Insert: {
          created_at: string
          created_by: string
          scope_reference_id?: string | null
          scope_type: string
          template_id: string
          tenant_id: string
          uuid?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          scope_reference_id?: string | null
          scope_type?: string
          template_id?: string
          tenant_id?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "approval_template_scope_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "approval_templates"
            referencedColumns: ["template_id"]
          },
          {
            foreignKeyName: "approval_template_scope_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      approval_template_steps: {
        Row: {
          config: Json | null
          created_at: string | null
          created_by: string
          email: string
          name: string
          step_id: string
          step_order: number
          updated_at: string | null
          user_id: string
          version_id: string
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          created_by?: string
          email: string
          name: string
          step_id?: string
          step_order: number
          updated_at?: string | null
          user_id: string
          version_id: string
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          created_by?: string
          email?: string
          name?: string
          step_id?: string
          step_order?: number
          updated_at?: string | null
          user_id?: string
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "approval_template_steps_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "approval_template_versions"
            referencedColumns: ["version_id"]
          },
        ]
      }
      approval_template_versions: {
        Row: {
          created_at: string | null
          created_by: string
          is_active: boolean | null
          published_at: string | null
          status: string
          template_id: string
          version_id: string
          version_number: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string
          is_active?: boolean | null
          published_at?: string | null
          status: string
          template_id: string
          version_id?: string
          version_number: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          is_active?: boolean | null
          published_at?: string | null
          status?: string
          template_id?: string
          version_id?: string
          version_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "approval_template_versions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "approval_templates"
            referencedColumns: ["template_id"]
          },
        ]
      }
      approval_templates: {
        Row: {
          approval_template_name: string
          approval_type: string
          created_at: string | null
          created_by: string
          description: string
          template_id: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          approval_template_name: string
          approval_type: string
          created_at?: string | null
          created_by?: string
          description: string
          template_id?: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          approval_template_name?: string
          approval_type?: string
          created_at?: string | null
          created_by?: string
          description?: string
          template_id?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "approval_templates_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      audit_events: {
        Row: {
          actor: Json
          audit_event_id: string
          context: Json | null
          event_type: string
          occurred_at: string
          request_id: string
          source_system: string
          stored_at: string
          subject: Json
          tenant_id: string | null
          trace_id: string
        }
        Insert: {
          actor: Json
          audit_event_id: string
          context?: Json | null
          event_type: string
          occurred_at: string
          request_id: string
          source_system: string
          stored_at?: string
          subject: Json
          tenant_id?: string | null
          trace_id: string
        }
        Update: {
          actor?: Json
          audit_event_id?: string
          context?: Json | null
          event_type?: string
          occurred_at?: string
          request_id?: string
          source_system?: string
          stored_at?: string
          subject?: Json
          tenant_id?: string | null
          trace_id?: string
        }
        Relationships: []
      }
      audit_seal_idempotency: {
        Row: {
          created_at: string
          request_id: string
          response: Json
          seal_id: string
        }
        Insert: {
          created_at?: string
          request_id: string
          response: Json
          seal_id: string
        }
        Update: {
          created_at?: string
          request_id?: string
          response?: Json
          seal_id?: string
        }
        Relationships: []
      }
      audit_seals: {
        Row: {
          batch_id: string
          previous_seal_hash: string | null
          seal_hash: string
          seal_id: string
          sealed_at: string
          signature: string
          source_system: string
          tenant_id: string | null
        }
        Insert: {
          batch_id: string
          previous_seal_hash?: string | null
          seal_hash: string
          seal_id?: string
          sealed_at?: string
          signature: string
          source_system: string
          tenant_id?: string | null
        }
        Update: {
          batch_id?: string
          previous_seal_hash?: string | null
          seal_hash?: string
          seal_id?: string
          sealed_at?: string
          signature?: string
          source_system?: string
          tenant_id?: string | null
        }
        Relationships: []
      }
      authorization_decisions: {
        Row: {
          decision_id: string
          decision_result: string | null
          decision_timestamp: string | null
          evaluation_result: string | null
          policy_id: string | null
          policy_name: string | null
          tenant_id: string
          trace_id: string | null
          transaction_id: string | null
        }
        Insert: {
          decision_id?: string
          decision_result?: string | null
          decision_timestamp?: string | null
          evaluation_result?: string | null
          policy_id?: string | null
          policy_name?: string | null
          tenant_id: string
          trace_id?: string | null
          transaction_id?: string | null
        }
        Update: {
          decision_id?: string
          decision_result?: string | null
          decision_timestamp?: string | null
          evaluation_result?: string | null
          policy_id?: string | null
          policy_name?: string | null
          tenant_id?: string
          trace_id?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "authorization_decisions_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["transaction_id"]
          },
        ]
      }
      billing_export_jobs: {
        Row: {
          app_id: string | null
          billing_from: string
          billing_to: string
          completed_at: string | null
          download_url: string | null
          error_message: string | null
          expires_at: string | null
          export_format: string
          export_job_id: string
          include_signature: boolean | null
          last_accessed_at: string | null
          processing_started_at: string | null
          reason: string | null
          record_count: number | null
          requested_at: string | null
          requested_by: string | null
          scope_type: string | null
          status: string
          tenant_id: string
        }
        Insert: {
          app_id?: string | null
          billing_from: string
          billing_to: string
          completed_at?: string | null
          download_url?: string | null
          error_message?: string | null
          expires_at?: string | null
          export_format: string
          export_job_id?: string
          include_signature?: boolean | null
          last_accessed_at?: string | null
          processing_started_at?: string | null
          reason?: string | null
          record_count?: number | null
          requested_at?: string | null
          requested_by?: string | null
          scope_type?: string | null
          status: string
          tenant_id: string
        }
        Update: {
          app_id?: string | null
          billing_from?: string
          billing_to?: string
          completed_at?: string | null
          download_url?: string | null
          error_message?: string | null
          expires_at?: string | null
          export_format?: string
          export_job_id?: string
          include_signature?: boolean | null
          last_accessed_at?: string | null
          processing_started_at?: string | null
          reason?: string | null
          record_count?: number | null
          requested_at?: string | null
          requested_by?: string | null
          scope_type?: string | null
          status?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "billing_export_jobs_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "applications_registry"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "billing_export_jobs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      classification_field_mappings: {
        Row: {
          classification: string
          classification_rule_id: string
          column_name: string
          created_at: string
          created_by: string
          mapping_id: string
          notes: string
          project_id: string | null
          sensitivity: string
          table_name: string
          updated_at: string
          version_id: string
        }
        Insert: {
          classification: string
          classification_rule_id: string
          column_name: string
          created_at?: string
          created_by: string
          mapping_id?: string
          notes: string
          project_id?: string | null
          sensitivity: string
          table_name: string
          updated_at?: string
          version_id: string
        }
        Update: {
          classification?: string
          classification_rule_id?: string
          column_name?: string
          created_at?: string
          created_by?: string
          mapping_id?: string
          notes?: string
          project_id?: string | null
          sensitivity?: string
          table_name?: string
          updated_at?: string
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "classification_field_mappings_classification_rule_id_fkey"
            columns: ["classification_rule_id"]
            isOneToOne: false
            referencedRelation: "classification_rules"
            referencedColumns: ["classification_rule_id"]
          },
          {
            foreignKeyName: "classification_field_mappings_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "classification_rule_versions"
            referencedColumns: ["version_id"]
          },
          {
            foreignKeyName: "encryption_targets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "supabase_projects"
            referencedColumns: ["uuid"]
          },
        ]
      }
      classification_rule_versions: {
        Row: {
          classification_rule_id: string
          created_at: string
          created_by: string
          effective_from: string
          status: string
          updated_at: string
          version_id: string
          version_no: string
        }
        Insert: {
          classification_rule_id: string
          created_at?: string
          created_by: string
          effective_from: string
          status?: string
          updated_at?: string
          version_id?: string
          version_no: string
        }
        Update: {
          classification_rule_id?: string
          created_at?: string
          created_by?: string
          effective_from?: string
          status?: string
          updated_at?: string
          version_id?: string
          version_no?: string
        }
        Relationships: [
          {
            foreignKeyName: "classification_rule_versions_classification_rule_id_fkey"
            columns: ["classification_rule_id"]
            isOneToOne: false
            referencedRelation: "classification_rules"
            referencedColumns: ["classification_rule_id"]
          },
        ]
      }
      classification_rules: {
        Row: {
          classification_rule_id: string
          created_at: string
          created_by: string
          description: string
          is_active: boolean
          rule_name: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          classification_rule_id?: string
          created_at?: string
          created_by: string
          description: string
          is_active?: boolean
          rule_name: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          classification_rule_id?: string
          created_at?: string
          created_by?: string
          description?: string
          is_active?: boolean
          rule_name?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "classification_rules_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      configuration_schemas: {
        Row: {
          app_id: string | null
          category: string
          config_key: string
          constraints: Json | null
          created_at: string
          created_by: string
          data_type: string
          default_value: Json | null
          description: string | null
          schema_id: string
          scope_applicability: string
          status: string
          tenant_id: string
          updated_at: string
          version: string | null
        }
        Insert: {
          app_id?: string | null
          category: string
          config_key: string
          constraints?: Json | null
          created_at?: string
          created_by: string
          data_type: string
          default_value?: Json | null
          description?: string | null
          schema_id?: string
          scope_applicability: string
          status: string
          tenant_id: string
          updated_at?: string
          version?: string | null
        }
        Update: {
          app_id?: string | null
          category?: string
          config_key?: string
          constraints?: Json | null
          created_at?: string
          created_by?: string
          data_type?: string
          default_value?: Json | null
          description?: string | null
          schema_id?: string
          scope_applicability?: string
          status?: string
          tenant_id?: string
          updated_at?: string
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "configuration_schemas_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "applications_registry"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "configuration_schemas_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      consent_lifecycle: {
        Row: {
          consent_record_id: string | null
          created_at: string | null
          effective_timestamp: string
          lifecycle_action: string | null
          lifecycle_record_id: string
          previous_state: string | null
          reason_code: string | null
          requested_by: string | null
          requested_by_type: string
          updated_at: string | null
          updated_state: string | null
        }
        Insert: {
          consent_record_id?: string | null
          created_at?: string | null
          effective_timestamp: string
          lifecycle_action?: string | null
          lifecycle_record_id?: string
          previous_state?: string | null
          reason_code?: string | null
          requested_by?: string | null
          requested_by_type: string
          updated_at?: string | null
          updated_state?: string | null
        }
        Update: {
          consent_record_id?: string | null
          created_at?: string | null
          effective_timestamp?: string
          lifecycle_action?: string | null
          lifecycle_record_id?: string
          previous_state?: string | null
          reason_code?: string | null
          requested_by?: string | null
          requested_by_type?: string
          updated_at?: string | null
          updated_state?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consent_lifecycle_consent_record_id_fkey"
            columns: ["consent_record_id"]
            isOneToOne: false
            referencedRelation: "consent_records"
            referencedColumns: ["consent_record_id"]
          },
        ]
      }
      consent_records: {
        Row: {
          channel: string | null
          consent_decision: string
          consent_record_id: string
          consent_timestamp: string | null
          created_at: string | null
          document_version_id: string | null
          ip_address: string | null
          source: string | null
          status: string | null
          tenant_id: string
          updated_at: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          channel?: string | null
          consent_decision: string
          consent_record_id?: string
          consent_timestamp?: string | null
          created_at?: string | null
          document_version_id?: string | null
          ip_address?: string | null
          source?: string | null
          status?: string | null
          tenant_id: string
          updated_at?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          channel?: string | null
          consent_decision?: string
          consent_record_id?: string
          consent_timestamp?: string | null
          created_at?: string | null
          document_version_id?: string | null
          ip_address?: string | null
          source?: string | null
          status?: string | null
          tenant_id?: string
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "consent_records_document_version_id_fkey"
            columns: ["document_version_id"]
            isOneToOne: false
            referencedRelation: "legal_document_versions"
            referencedColumns: ["document_version_id"]
          },
          {
            foreignKeyName: "consent_records_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      consent_state: {
        Row: {
          consent_record_id: string
          current_state: string | null
          document_version_id: string
          last_updated: string | null
          user_id: string | null
        }
        Insert: {
          consent_record_id: string
          current_state?: string | null
          document_version_id: string
          last_updated?: string | null
          user_id?: string | null
        }
        Update: {
          consent_record_id?: string
          current_state?: string | null
          document_version_id?: string
          last_updated?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consent_state_document_version_id_fkey"
            columns: ["document_version_id"]
            isOneToOne: false
            referencedRelation: "legal_document_versions"
            referencedColumns: ["document_version_id"]
          },
        ]
      }
      crypto_audit_logs: {
        Row: {
          created_at: string | null
          data_class_id: string | null
          error_message: string | null
          key_scope_id: string | null
          operation: string
          status: string
          tenant_id: string | null
          trace_id: string
          user_id: string
          uuid: string
        }
        Insert: {
          created_at?: string | null
          data_class_id?: string | null
          error_message?: string | null
          key_scope_id?: string | null
          operation: string
          status: string
          tenant_id?: string | null
          trace_id: string
          user_id: string
          uuid?: string
        }
        Update: {
          created_at?: string | null
          data_class_id?: string | null
          error_message?: string | null
          key_scope_id?: string | null
          operation?: string
          status?: string
          tenant_id?: string | null
          trace_id?: string
          user_id?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "crypto_audit_logs_data_class_id_fkey"
            columns: ["data_class_id"]
            isOneToOne: false
            referencedRelation: "data_classes"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "crypto_audit_logs_key_scope_id_fkey"
            columns: ["key_scope_id"]
            isOneToOne: false
            referencedRelation: "key_scopes"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "crypto_audit_logs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      crypto_policies: {
        Row: {
          allow_decrypt: boolean | null
          allow_encrypt: boolean | null
          created_at: string | null
          data_class_id: string | null
          require_step_up: boolean | null
          tenant_id: string | null
          uuid: string
        }
        Insert: {
          allow_decrypt?: boolean | null
          allow_encrypt?: boolean | null
          created_at?: string | null
          data_class_id?: string | null
          require_step_up?: boolean | null
          tenant_id?: string | null
          uuid?: string
        }
        Update: {
          allow_decrypt?: boolean | null
          allow_encrypt?: boolean | null
          created_at?: string | null
          data_class_id?: string | null
          require_step_up?: boolean | null
          tenant_id?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "crypto_policies_data_class_id_fkey"
            columns: ["data_class_id"]
            isOneToOne: false
            referencedRelation: "data_classes"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "crypto_policies_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      crypto_rate_limits: {
        Row: {
          created_at: string | null
          data_class_id: string | null
          operation: string
          request_count: number | null
          tenant_id: string | null
          user_id: string
          uuid: string
          window_start: string
        }
        Insert: {
          created_at?: string | null
          data_class_id?: string | null
          operation: string
          request_count?: number | null
          tenant_id?: string | null
          user_id: string
          uuid?: string
          window_start: string
        }
        Update: {
          created_at?: string | null
          data_class_id?: string | null
          operation?: string
          request_count?: number | null
          tenant_id?: string | null
          user_id?: string
          uuid?: string
          window_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "crypto_rate_limits_data_class_id_fkey"
            columns: ["data_class_id"]
            isOneToOne: false
            referencedRelation: "data_classes"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "crypto_rate_limits_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      data_classes: {
        Row: {
          created_at: string | null
          description: string | null
          name: string
          uuid: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          name: string
          uuid?: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          name?: string
          uuid?: string
        }
        Relationships: []
      }
      decision_records: {
        Row: {
          decided_at: string
          decided_by: string
          decision_id: string
          decision_type: string
          outcome: string
          reason_codes: string[] | null
          record_id: string
          recorded_at: string
          request_id: string
          resource_id: string
          resource_type: string
          subject_id: string
          subject_type: string
          trace_id: string
        }
        Insert: {
          decided_at: string
          decided_by: string
          decision_id: string
          decision_type: string
          outcome: string
          reason_codes?: string[] | null
          record_id?: string
          recorded_at?: string
          request_id: string
          resource_id: string
          resource_type: string
          subject_id: string
          subject_type: string
          trace_id: string
        }
        Update: {
          decided_at?: string
          decided_by?: string
          decision_id?: string
          decision_type?: string
          outcome?: string
          reason_codes?: string[] | null
          record_id?: string
          recorded_at?: string
          request_id?: string
          resource_id?: string
          resource_type?: string
          subject_id?: string
          subject_type?: string
          trace_id?: string
        }
        Relationships: []
      }
      delegation_allowed_scopes: {
        Row: {
          allowed_scope_id: string
          app_id: string
          created_at: string
          created_by: string
          delegation_id: string
          scope_type: string
          updated_at: string
        }
        Insert: {
          allowed_scope_id?: string
          app_id: string
          created_at?: string
          created_by: string
          delegation_id: string
          scope_type: string
          updated_at?: string
        }
        Update: {
          allowed_scope_id?: string
          app_id?: string
          created_at?: string
          created_by?: string
          delegation_id?: string
          scope_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "delegation_allowed_scopes_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "applications_registry"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "delegation_allowed_scopes_delegation_id_fkey"
            columns: ["delegation_id"]
            isOneToOne: false
            referencedRelation: "delegations"
            referencedColumns: ["delegation_id"]
          },
        ]
      }
      delegation_eligibility_rules: {
        Row: {
          attribute: string
          created_at: string
          delegation_id: string
          operator: string
          rule_id: string
          updated_at: string
          value: Json
        }
        Insert: {
          attribute: string
          created_at?: string
          delegation_id: string
          operator: string
          rule_id?: string
          updated_at?: string
          value: Json
        }
        Update: {
          attribute?: string
          created_at?: string
          delegation_id?: string
          operator?: string
          rule_id?: string
          updated_at?: string
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "delegation_eligibility_rules_delegation_id_fkey"
            columns: ["delegation_id"]
            isOneToOne: false
            referencedRelation: "delegations"
            referencedColumns: ["delegation_id"]
          },
        ]
      }
      delegation_lifecycle: {
        Row: {
          created_at: string | null
          delegation_id: string
          effective_from: string | null
          effective_until: string | null
          lifecycle_action: string
          lifecycle_id: string
          performed_by: string
          reason: string | null
        }
        Insert: {
          created_at?: string | null
          delegation_id: string
          effective_from?: string | null
          effective_until?: string | null
          lifecycle_action: string
          lifecycle_id?: string
          performed_by: string
          reason?: string | null
        }
        Update: {
          created_at?: string | null
          delegation_id?: string
          effective_from?: string | null
          effective_until?: string | null
          lifecycle_action?: string
          lifecycle_id?: string
          performed_by?: string
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "delegation_lifecycle_delegation_id_fkey"
            columns: ["delegation_id"]
            isOneToOne: false
            referencedRelation: "delegations"
            referencedColumns: ["delegation_id"]
          },
        ]
      }
      delegations: {
        Row: {
          created_at: string
          created_by: string
          delegatee_user_email: string
          delegatee_user_id: string
          delegation_id: string
          delegation_type: string
          delegator_user_email: string
          delegator_user_id: string
          description: string
          status: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          delegatee_user_email: string
          delegatee_user_id: string
          delegation_id?: string
          delegation_type: string
          delegator_user_email: string
          delegator_user_id: string
          description: string
          status?: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          delegatee_user_email?: string
          delegatee_user_id?: string
          delegation_id?: string
          delegation_type?: string
          delegator_user_email?: string
          delegator_user_id?: string
          description?: string
          status?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "delegations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      email_templates: {
        Row: {
          body_html_template: string
          body_text_template: string
          created_at: string | null
          locale: string
          status: string
          subject_template: string
          template_key: string
          updated_at: string | null
          version: number
        }
        Insert: {
          body_html_template: string
          body_text_template: string
          created_at?: string | null
          locale: string
          status?: string
          subject_template: string
          template_key: string
          updated_at?: string | null
          version?: number
        }
        Update: {
          body_html_template?: string
          body_text_template?: string
          created_at?: string | null
          locale?: string
          status?: string
          subject_template?: string
          template_key?: string
          updated_at?: string | null
          version?: number
        }
        Relationships: []
      }
      encryption_targets: {
        Row: {
          column_name: string
          created_at: string | null
          data_class_id: string | null
          is_active: boolean | null
          project_id: string | null
          purpose: string
          table_name: string
          tenant_id: string | null
          uuid: string
        }
        Insert: {
          column_name: string
          created_at?: string | null
          data_class_id?: string | null
          is_active?: boolean | null
          project_id?: string | null
          purpose?: string
          table_name: string
          tenant_id?: string | null
          uuid?: string
        }
        Update: {
          column_name?: string
          created_at?: string | null
          data_class_id?: string | null
          is_active?: boolean | null
          project_id?: string | null
          purpose?: string
          table_name?: string
          tenant_id?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "encryption_targets_data_class_id_fkey"
            columns: ["data_class_id"]
            isOneToOne: false
            referencedRelation: "data_classes"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "encryption_targets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "supabase_projects"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "encryption_targets_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      enforcement_result_events: {
        Row: {
          action: string
          details: string | null
          emitted_at: string
          enforcement_outcome: string
          policy_decision: string
          request_id: string
          resource_type: string
          source_system: string
          trace_id: string
        }
        Insert: {
          action: string
          details?: string | null
          emitted_at?: string
          enforcement_outcome: string
          policy_decision: string
          request_id: string
          resource_type: string
          source_system: string
          trace_id: string
        }
        Update: {
          action?: string
          details?: string | null
          emitted_at?: string
          enforcement_outcome?: string
          policy_decision?: string
          request_id?: string
          resource_type?: string
          source_system?: string
          trace_id?: string
        }
        Relationships: []
      }
      envelope_policies: {
        Row: {
          algorithm: string
          created_at: string | null
          data_class_id: string | null
          enc_version: number
          is_active: boolean | null
          iv_length: number
          tag_length: number
          uuid: string
        }
        Insert: {
          algorithm: string
          created_at?: string | null
          data_class_id?: string | null
          enc_version: number
          is_active?: boolean | null
          iv_length: number
          tag_length: number
          uuid?: string
        }
        Update: {
          algorithm?: string
          created_at?: string | null
          data_class_id?: string | null
          enc_version?: number
          is_active?: boolean | null
          iv_length?: number
          tag_length?: number
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "envelope_policies_data_class_id_fkey"
            columns: ["data_class_id"]
            isOneToOne: false
            referencedRelation: "data_classes"
            referencedColumns: ["uuid"]
          },
        ]
      }
      event_acl: {
        Row: {
          acl_id: string
          app_id: string
          created_at: string
          environment_id: string | null
          event_id: string
          permission_type: string
          tenant_id: string
        }
        Insert: {
          acl_id?: string
          app_id: string
          created_at?: string
          environment_id?: string | null
          event_id: string
          permission_type: string
          tenant_id: string
        }
        Update: {
          acl_id?: string
          app_id?: string
          created_at?: string
          environment_id?: string | null
          event_id?: string
          permission_type?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_acl_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "applications_registry"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "event_acl_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "event_definitions"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "event_acl_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      event_definitions: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          domain: string
          event_id: string
          event_name: string
          partition_key_field: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          domain: string
          event_id?: string
          event_name: string
          partition_key_field: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          domain?: string
          event_id?: string
          event_name?: string
          partition_key_field?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_definitions_domain_fkey"
            columns: ["domain"]
            isOneToOne: false
            referencedRelation: "event_domains"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "event_definitions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      event_domains: {
        Row: {
          created_at: string
          created_by: string | null
          domain_code: string
          domain_name: string
          status: string
          system_defined: boolean
          tenant_id: string | null
          tenant_scope: string
          updated_at: string
          uuid: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          domain_code: string
          domain_name: string
          status?: string
          system_defined?: boolean
          tenant_id?: string | null
          tenant_scope: string
          updated_at?: string
          uuid?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          domain_code?: string
          domain_name?: string
          status?: string
          system_defined?: boolean
          tenant_id?: string | null
          tenant_scope?: string
          updated_at?: string
          uuid?: string
        }
        Relationships: []
      }
      event_headers: {
        Row: {
          event_version_id: string
          header_name: string
          header_type: string
          is_required: boolean
          uuid: string
        }
        Insert: {
          event_version_id: string
          header_name: string
          header_type: string
          is_required?: boolean
          uuid?: string
        }
        Update: {
          event_version_id?: string
          header_name?: string
          header_type?: string
          is_required?: boolean
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_headers_event_version_id_fkey"
            columns: ["event_version_id"]
            isOneToOne: false
            referencedRelation: "event_versions"
            referencedColumns: ["event_version_id"]
          },
        ]
      }
      event_registry: {
        Row: {
          created_at: string
          created_by: string | null
          event_type: string
          headers_required: string[]
          id: string
          partition_keys: string[] | null
          schema_version: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          event_type: string
          headers_required: string[]
          id?: string
          partition_keys?: string[] | null
          schema_version: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          event_type?: string
          headers_required?: string[]
          id?: string
          partition_keys?: string[] | null
          schema_version?: number
        }
        Relationships: []
      }
      event_routing_config: {
        Row: {
          created_at: string
          created_by: string | null
          delivery_mode: string
          event_type: string
          id: string
          is_active: boolean
          partition_key: string | null
          subscriber_endpoint: string
          subscriber_name: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          delivery_mode: string
          event_type: string
          id?: string
          is_active?: boolean
          partition_key?: string | null
          subscriber_endpoint: string
          subscriber_name: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          delivery_mode?: string
          event_type?: string
          id?: string
          is_active?: boolean
          partition_key?: string | null
          subscriber_endpoint?: string
          subscriber_name?: string
        }
        Relationships: []
      }
      event_routing_intake: {
        Row: {
          event_definition_id: string
          event_id: string
          idempotency_key: string
          received_at: string
          routing_intake_id: string
          status: string
          tenant_id: string
          trace_id: string
        }
        Insert: {
          event_definition_id: string
          event_id: string
          idempotency_key: string
          received_at?: string
          routing_intake_id?: string
          status?: string
          tenant_id: string
          trace_id: string
        }
        Update: {
          event_definition_id?: string
          event_id?: string
          idempotency_key?: string
          received_at?: string
          routing_intake_id?: string
          status?: string
          tenant_id?: string
          trace_id?: string
        }
        Relationships: []
      }
      event_routing_metadata: {
        Row: {
          allowed_streams: Json
          effective_from: string
          event_version_id: string
          id: string
          routing_metadata_version: string
        }
        Insert: {
          allowed_streams?: Json
          effective_from?: string
          event_version_id: string
          id?: string
          routing_metadata_version: string
        }
        Update: {
          allowed_streams?: Json
          effective_from?: string
          event_version_id?: string
          id?: string
          routing_metadata_version?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_routing_metadata_event_version_fkey"
            columns: ["event_version_id"]
            isOneToOne: true
            referencedRelation: "event_versions"
            referencedColumns: ["event_version_id"]
          },
        ]
      }
      event_schemas: {
        Row: {
          created_at: string
          event_version_id: string
          id: string
          schema_definition: Json
          schema_type: string
        }
        Insert: {
          created_at?: string
          event_version_id: string
          id?: string
          schema_definition: Json
          schema_type: string
        }
        Update: {
          created_at?: string
          event_version_id?: string
          id?: string
          schema_definition?: Json
          schema_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_schemas_event_version_id_fkey"
            columns: ["event_version_id"]
            isOneToOne: true
            referencedRelation: "event_versions"
            referencedColumns: ["event_version_id"]
          },
        ]
      }
      event_versions: {
        Row: {
          activated_at: string | null
          base_version: string | null
          compatibility_mode: string
          created_at: string | null
          created_by: string
          event_definition_id: string
          event_version_id: string
          status: string
          validation_status: string
          version_number: string
        }
        Insert: {
          activated_at?: string | null
          base_version?: string | null
          compatibility_mode?: string
          created_at?: string | null
          created_by: string
          event_definition_id: string
          event_version_id?: string
          status?: string
          validation_status?: string
          version_number: string
        }
        Update: {
          activated_at?: string | null
          base_version?: string | null
          compatibility_mode?: string
          created_at?: string | null
          created_by?: string
          event_definition_id?: string
          event_version_id?: string
          status?: string
          validation_status?: string
          version_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_versions_event_definition_id_fkey"
            columns: ["event_definition_id"]
            isOneToOne: false
            referencedRelation: "event_definitions"
            referencedColumns: ["event_id"]
          },
        ]
      }
      evidence_artifacts: {
        Row: {
          approval_decision_id: string | null
          artifact_name: string | null
          artifact_type: string
          classification: string
          created_at: string | null
          created_by: string
          description: string | null
          evidence_id: string
          policy_version_id: string
          recorded_at: string
          source_system: string
          tenant_id: string
          trace_id: string | null
          updated_at: string | null
          workflow_id: string | null
        }
        Insert: {
          approval_decision_id?: string | null
          artifact_name?: string | null
          artifact_type: string
          classification: string
          created_at?: string | null
          created_by: string
          description?: string | null
          evidence_id?: string
          policy_version_id: string
          recorded_at?: string
          source_system: string
          tenant_id: string
          trace_id?: string | null
          updated_at?: string | null
          workflow_id?: string | null
        }
        Update: {
          approval_decision_id?: string | null
          artifact_name?: string | null
          artifact_type?: string
          classification?: string
          created_at?: string | null
          created_by?: string
          description?: string | null
          evidence_id?: string
          policy_version_id?: string
          recorded_at?: string
          source_system?: string
          tenant_id?: string
          trace_id?: string | null
          updated_at?: string | null
          workflow_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "evidence_artifacts_policy_version_id_fkey"
            columns: ["policy_version_id"]
            isOneToOne: false
            referencedRelation: "evidence_governance_policies"
            referencedColumns: ["policy_version_id"]
          },
          {
            foreignKeyName: "evidence_artifacts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      evidence_governance_policies: {
        Row: {
          access_justification_required: boolean
          access_scope: Database["public"]["Enums"]["evidence_access_scope"]
          archive_after_days: number
          created_at: string
          created_by: string
          data_sensitivity: Database["public"]["Enums"]["evidence_sensitivity"]
          effective_timestamp: string | null
          evidence_category: string | null
          policy_name: string
          policy_type: string
          policy_version_id: string
          retention_class: string
          retention_duration_days: number
          scope_value: string | null
          status: Database["public"]["Enums"]["evidence_policy_status"]
          tenant_id: string
          updated_at: string
          version_no: string
        }
        Insert: {
          access_justification_required?: boolean
          access_scope: Database["public"]["Enums"]["evidence_access_scope"]
          archive_after_days: number
          created_at?: string
          created_by: string
          data_sensitivity: Database["public"]["Enums"]["evidence_sensitivity"]
          effective_timestamp?: string | null
          evidence_category?: string | null
          policy_name?: string
          policy_type?: string
          policy_version_id?: string
          retention_class: string
          retention_duration_days: number
          scope_value?: string | null
          status?: Database["public"]["Enums"]["evidence_policy_status"]
          tenant_id: string
          updated_at?: string
          version_no: string
        }
        Update: {
          access_justification_required?: boolean
          access_scope?: Database["public"]["Enums"]["evidence_access_scope"]
          archive_after_days?: number
          created_at?: string
          created_by?: string
          data_sensitivity?: Database["public"]["Enums"]["evidence_sensitivity"]
          effective_timestamp?: string | null
          evidence_category?: string | null
          policy_name?: string
          policy_type?: string
          policy_version_id?: string
          retention_class?: string
          retention_duration_days?: number
          scope_value?: string | null
          status?: Database["public"]["Enums"]["evidence_policy_status"]
          tenant_id?: string
          updated_at?: string
          version_no?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidence_governance_policies_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      evidence_integrity: {
        Row: {
          artifact_hash: string
          batch_seal_reference: string | null
          created_at: string | null
          evidence_id: string
          evidence_integrity_id: string
          hash_chain_reference: string | null
          integrity_status: string | null
          updated_at: string | null
        }
        Insert: {
          artifact_hash: string
          batch_seal_reference?: string | null
          created_at?: string | null
          evidence_id: string
          evidence_integrity_id?: string
          hash_chain_reference?: string | null
          integrity_status?: string | null
          updated_at?: string | null
        }
        Update: {
          artifact_hash?: string
          batch_seal_reference?: string | null
          created_at?: string | null
          evidence_id?: string
          evidence_integrity_id?: string
          hash_chain_reference?: string | null
          integrity_status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "evidence_integrity_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: true
            referencedRelation: "evidence_artifacts"
            referencedColumns: ["evidence_id"]
          },
        ]
      }
      evidence_package_items: {
        Row: {
          artifact_hash: string | null
          evidence_id: string
          included_at: string
          package_id: string
          package_item_id: string
        }
        Insert: {
          artifact_hash?: string | null
          evidence_id: string
          included_at?: string
          package_id: string
          package_item_id?: string
        }
        Update: {
          artifact_hash?: string | null
          evidence_id?: string
          included_at?: string
          package_id?: string
          package_item_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidence_package_items_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: false
            referencedRelation: "evidence_artifacts"
            referencedColumns: ["evidence_id"]
          },
          {
            foreignKeyName: "evidence_package_items_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "evidence_packages"
            referencedColumns: ["package_id"]
          },
        ]
      }
      evidence_package_job_artifact_types: {
        Row: {
          artifact_type: string
          created_at: string
          package_job_artifact_type_id: string
          package_job_id: string
        }
        Insert: {
          artifact_type: string
          created_at?: string
          package_job_artifact_type_id?: string
          package_job_id: string
        }
        Update: {
          artifact_type?: string
          created_at?: string
          package_job_artifact_type_id?: string
          package_job_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidence_package_job_artifact_types_package_job_id_fkey"
            columns: ["package_job_id"]
            isOneToOne: false
            referencedRelation: "evidence_package_jobs"
            referencedColumns: ["package_job_id"]
          },
        ]
      }
      evidence_package_jobs: {
        Row: {
          artifact_count: number
          completed_at: string | null
          created_at: string
          failed_at: string | null
          failure_reason: string | null
          from_date: string | null
          include_integrity_proofs: boolean
          include_provenance: boolean
          integrity_status_filter: string | null
          output_format: string
          package_job_id: string
          requested_at: string
          requested_by: string
          selection_source: string | null
          status: string
          tenant_id: string
          to_date: string | null
          trace_id: string | null
          updated_at: string
        }
        Insert: {
          artifact_count?: number
          completed_at?: string | null
          created_at?: string
          failed_at?: string | null
          failure_reason?: string | null
          from_date?: string | null
          include_integrity_proofs?: boolean
          include_provenance?: boolean
          integrity_status_filter?: string | null
          output_format?: string
          package_job_id?: string
          requested_at?: string
          requested_by: string
          selection_source?: string | null
          status?: string
          tenant_id: string
          to_date?: string | null
          trace_id?: string | null
          updated_at?: string
        }
        Update: {
          artifact_count?: number
          completed_at?: string | null
          created_at?: string
          failed_at?: string | null
          failure_reason?: string | null
          from_date?: string | null
          include_integrity_proofs?: boolean
          include_provenance?: boolean
          integrity_status_filter?: string | null
          output_format?: string
          package_job_id?: string
          requested_at?: string
          requested_by?: string
          selection_source?: string | null
          status?: string
          tenant_id?: string
          to_date?: string | null
          trace_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidence_package_jobs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      evidence_packages: {
        Row: {
          artifact_count: number
          batch_seal_reference: string | null
          created_at: string
          expires_at: string | null
          package_hash: string | null
          package_id: string
          package_job_id: string
          package_name: string | null
          storage_url: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          artifact_count?: number
          batch_seal_reference?: string | null
          created_at?: string
          expires_at?: string | null
          package_hash?: string | null
          package_id?: string
          package_job_id: string
          package_name?: string | null
          storage_url: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          artifact_count?: number
          batch_seal_reference?: string | null
          created_at?: string
          expires_at?: string | null
          package_hash?: string | null
          package_id?: string
          package_job_id?: string
          package_name?: string | null
          storage_url?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidence_packages_package_job_id_fkey"
            columns: ["package_job_id"]
            isOneToOne: true
            referencedRelation: "evidence_package_jobs"
            referencedColumns: ["package_job_id"]
          },
          {
            foreignKeyName: "evidence_packages_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      evidence_policy_allowed_actions: {
        Row: {
          action_name: Database["public"]["Enums"]["evidence_policy_action"]
          created_at: string
          policy_version_id: string
          uuid: string
        }
        Insert: {
          action_name: Database["public"]["Enums"]["evidence_policy_action"]
          created_at?: string
          policy_version_id: string
          uuid?: string
        }
        Update: {
          action_name?: Database["public"]["Enums"]["evidence_policy_action"]
          created_at?: string
          policy_version_id?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidence_policy_allowed_actions_policy_version_id_fkey"
            columns: ["policy_version_id"]
            isOneToOne: false
            referencedRelation: "evidence_governance_policies"
            referencedColumns: ["policy_version_id"]
          },
        ]
      }
      evidence_policy_allowed_roles: {
        Row: {
          created_at: string
          policy_version_id: string
          role_id: string
          uuid: string
        }
        Insert: {
          created_at?: string
          policy_version_id: string
          role_id: string
          uuid?: string
        }
        Update: {
          created_at?: string
          policy_version_id?: string
          role_id?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidence_policy_allowed_roles_policy_version_id_fkey"
            columns: ["policy_version_id"]
            isOneToOne: false
            referencedRelation: "evidence_governance_policies"
            referencedColumns: ["policy_version_id"]
          },
          {
            foreignKeyName: "evidence_policy_allowed_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["uuid"]
          },
        ]
      }
      evidence_policy_artifact_types: {
        Row: {
          artifact_type: string
          created_at: string
          policy_version_id: string
          uuid: string
        }
        Insert: {
          artifact_type: string
          created_at?: string
          policy_version_id: string
          uuid?: string
        }
        Update: {
          artifact_type?: string
          created_at?: string
          policy_version_id?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidence_policy_artifact_types_policy_version_id_fkey"
            columns: ["policy_version_id"]
            isOneToOne: false
            referencedRelation: "evidence_governance_policies"
            referencedColumns: ["policy_version_id"]
          },
        ]
      }
      evidence_policy_framework_tags: {
        Row: {
          created_at: string
          framework_tag: string
          policy_version_id: string
          uuid: string
        }
        Insert: {
          created_at?: string
          framework_tag: string
          policy_version_id: string
          uuid?: string
        }
        Update: {
          created_at?: string
          framework_tag?: string
          policy_version_id?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidence_policy_framework_tags_policy_version_id_fkey"
            columns: ["policy_version_id"]
            isOneToOne: false
            referencedRelation: "evidence_governance_policies"
            referencedColumns: ["policy_version_id"]
          },
        ]
      }
      evidence_policy_version_history: {
        Row: {
          event_at: string
          event_by: string | null
          event_type: string
          history_id: string
          new_status:
            | Database["public"]["Enums"]["evidence_policy_status"]
            | null
          notes: string | null
          old_status:
            | Database["public"]["Enums"]["evidence_policy_status"]
            | null
          policy_version_id: string
          tenant_id: string
        }
        Insert: {
          event_at?: string
          event_by?: string | null
          event_type: string
          history_id?: string
          new_status?:
            | Database["public"]["Enums"]["evidence_policy_status"]
            | null
          notes?: string | null
          old_status?:
            | Database["public"]["Enums"]["evidence_policy_status"]
            | null
          policy_version_id: string
          tenant_id: string
        }
        Update: {
          event_at?: string
          event_by?: string | null
          event_type?: string
          history_id?: string
          new_status?:
            | Database["public"]["Enums"]["evidence_policy_status"]
            | null
          notes?: string | null
          old_status?:
            | Database["public"]["Enums"]["evidence_policy_status"]
            | null
          policy_version_id?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidence_policy_version_history_policy_version_id_fkey"
            columns: ["policy_version_id"]
            isOneToOne: false
            referencedRelation: "evidence_governance_policies"
            referencedColumns: ["policy_version_id"]
          },
          {
            foreignKeyName: "evidence_policy_version_history_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      evidence_storage: {
        Row: {
          evidence_id: string
          evidence_storage_id: string
          file_format: string | null
          file_name: string | null
          file_size_bytes: number | null
          storage_url: string
          uploaded_at: string
          uploaded_by: string
          uploaded_status: string
        }
        Insert: {
          evidence_id: string
          evidence_storage_id?: string
          file_format?: string | null
          file_name?: string | null
          file_size_bytes?: number | null
          storage_url: string
          uploaded_at: string
          uploaded_by: string
          uploaded_status?: string
        }
        Update: {
          evidence_id?: string
          evidence_storage_id?: string
          file_format?: string | null
          file_name?: string | null
          file_size_bytes?: number | null
          storage_url?: string
          uploaded_at?: string
          uploaded_by?: string
          uploaded_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidence_storage_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: true
            referencedRelation: "evidence_artifacts"
            referencedColumns: ["evidence_id"]
          },
        ]
      }
      gateway_route_registry: {
        Row: {
          created_at: string
          enforcement_pipeline: string
          http_method: string
          is_active: boolean
          request_path: string
          route_id: string
          target_service: string
        }
        Insert: {
          created_at?: string
          enforcement_pipeline: string
          http_method: string
          is_active?: boolean
          request_path: string
          route_id?: string
          target_service: string
        }
        Update: {
          created_at?: string
          enforcement_pipeline?: string
          http_method?: string
          is_active?: boolean
          request_path?: string
          route_id?: string
          target_service?: string
        }
        Relationships: []
      }
      global_configuration_values: {
        Row: {
          config_id: string
          created_at: string
          created_by: string
          published_at: string | null
          schema_id: string
          status: string
          updated_at: string
          value: Json
          version: string
        }
        Insert: {
          config_id?: string
          created_at?: string
          created_by: string
          published_at?: string | null
          schema_id: string
          status: string
          updated_at?: string
          value: Json
          version: string
        }
        Update: {
          config_id?: string
          created_at?: string
          created_by?: string
          published_at?: string | null
          schema_id?: string
          status?: string
          updated_at?: string
          value?: Json
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "global_configuration_values_schema_id_fkey"
            columns: ["schema_id"]
            isOneToOne: false
            referencedRelation: "configuration_schemas"
            referencedColumns: ["schema_id"]
          },
        ]
      }
      governance_decision_classifications: {
        Row: {
          classification_rule_id: string | null
          classification_version_id: string | null
          created_at: string
          data_class: string
          decision_classification_id: string
          decision_id: string
          field_path: string | null
          schema_reference: string | null
          sensitivity: string | null
        }
        Insert: {
          classification_rule_id?: string | null
          classification_version_id?: string | null
          created_at?: string
          data_class: string
          decision_classification_id?: string
          decision_id: string
          field_path?: string | null
          schema_reference?: string | null
          sensitivity?: string | null
        }
        Update: {
          classification_rule_id?: string | null
          classification_version_id?: string | null
          created_at?: string
          data_class?: string
          decision_classification_id?: string
          decision_id?: string
          field_path?: string | null
          schema_reference?: string | null
          sensitivity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "governance_decision_classificati_classification_version_id_fkey"
            columns: ["classification_version_id"]
            isOneToOne: false
            referencedRelation: "classification_rule_versions"
            referencedColumns: ["version_id"]
          },
          {
            foreignKeyName: "governance_decision_classifications_classification_rule_id_fkey"
            columns: ["classification_rule_id"]
            isOneToOne: false
            referencedRelation: "classification_rules"
            referencedColumns: ["classification_rule_id"]
          },
          {
            foreignKeyName: "governance_decision_classifications_decision_id_fkey"
            columns: ["decision_id"]
            isOneToOne: false
            referencedRelation: "governance_decisions"
            referencedColumns: ["gov_decision_id"]
          },
        ]
      }
      governance_decision_rules: {
        Row: {
          created_at: string
          decision_id: string
          decision_rule_id: string
          outcome: Database["public"]["Enums"]["gov_trace_outcome_type"]
          policy_id: string | null
          policy_version_id: string | null
          rule_reference: string
        }
        Insert: {
          created_at?: string
          decision_id: string
          decision_rule_id?: string
          outcome: Database["public"]["Enums"]["gov_trace_outcome_type"]
          policy_id?: string | null
          policy_version_id?: string | null
          rule_reference: string
        }
        Update: {
          created_at?: string
          decision_id?: string
          decision_rule_id?: string
          outcome?: Database["public"]["Enums"]["gov_trace_outcome_type"]
          policy_id?: string | null
          policy_version_id?: string | null
          rule_reference?: string
        }
        Relationships: [
          {
            foreignKeyName: "governance_decision_rules_decision_id_fkey"
            columns: ["decision_id"]
            isOneToOne: false
            referencedRelation: "governance_decisions"
            referencedColumns: ["gov_decision_id"]
          },
          {
            foreignKeyName: "governance_decision_rules_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "governance_policies"
            referencedColumns: ["governance_policy_id"]
          },
          {
            foreignKeyName: "governance_decision_rules_policy_version_id_fkey"
            columns: ["policy_version_id"]
            isOneToOne: false
            referencedRelation: "governance_policy_versions"
            referencedColumns: ["version_id"]
          },
        ]
      }
      governance_decision_timeline_events: {
        Row: {
          decision_id: string
          event_description: string | null
          event_stage: string
          event_status: string | null
          event_timestamp: string
          event_title: string
          sort_order: number
          timeline_event_id: string
        }
        Insert: {
          decision_id: string
          event_description?: string | null
          event_stage: string
          event_status?: string | null
          event_timestamp?: string
          event_title: string
          sort_order?: number
          timeline_event_id?: string
        }
        Update: {
          decision_id?: string
          event_description?: string | null
          event_stage?: string
          event_status?: string | null
          event_timestamp?: string
          event_title?: string
          sort_order?: number
          timeline_event_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "governance_decision_timeline_events_decision_id_fkey"
            columns: ["decision_id"]
            isOneToOne: false
            referencedRelation: "governance_decisions"
            referencedColumns: ["gov_decision_id"]
          },
        ]
      }
      governance_decisions: {
        Row: {
          action: Database["public"]["Enums"]["gov_trace_action_type"]
          actor_id: string | null
          channel: string | null
          classification_version_id: string | null
          context_fetch_latency_ms: number | null
          created_at: string
          dataset_reference: string | null
          decision: Database["public"]["Enums"]["gov_trace_decision_type"]
          decision_reason: string | null
          decision_timestamp: string
          destination: string | null
          engine_latency_ms: number | null
          gov_decision_id: string
          policy_eval_latency_ms: number | null
          policy_version_id: string | null
          request_id: string | null
          resource: string
          resource_type: string | null
          schema_reference: string | null
          source_system: string | null
          tenant_id: string
          trace_id: string
        }
        Insert: {
          action: Database["public"]["Enums"]["gov_trace_action_type"]
          actor_id?: string | null
          channel?: string | null
          classification_version_id?: string | null
          context_fetch_latency_ms?: number | null
          created_at?: string
          dataset_reference?: string | null
          decision: Database["public"]["Enums"]["gov_trace_decision_type"]
          decision_reason?: string | null
          decision_timestamp?: string
          destination?: string | null
          engine_latency_ms?: number | null
          gov_decision_id?: string
          policy_eval_latency_ms?: number | null
          policy_version_id?: string | null
          request_id?: string | null
          resource: string
          resource_type?: string | null
          schema_reference?: string | null
          source_system?: string | null
          tenant_id: string
          trace_id: string
        }
        Update: {
          action?: Database["public"]["Enums"]["gov_trace_action_type"]
          actor_id?: string | null
          channel?: string | null
          classification_version_id?: string | null
          context_fetch_latency_ms?: number | null
          created_at?: string
          dataset_reference?: string | null
          decision?: Database["public"]["Enums"]["gov_trace_decision_type"]
          decision_reason?: string | null
          decision_timestamp?: string
          destination?: string | null
          engine_latency_ms?: number | null
          gov_decision_id?: string
          policy_eval_latency_ms?: number | null
          policy_version_id?: string | null
          request_id?: string | null
          resource?: string
          resource_type?: string | null
          schema_reference?: string | null
          source_system?: string | null
          tenant_id?: string
          trace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "governance_decisions_classification_version_id_fkey"
            columns: ["classification_version_id"]
            isOneToOne: false
            referencedRelation: "classification_rule_versions"
            referencedColumns: ["version_id"]
          },
          {
            foreignKeyName: "governance_decisions_policy_version_id_fkey"
            columns: ["policy_version_id"]
            isOneToOne: false
            referencedRelation: "governance_policy_versions"
            referencedColumns: ["version_id"]
          },
          {
            foreignKeyName: "governance_decisions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      governance_obligations: {
        Row: {
          created_at: string
          decision_id: string
          obligation_id: string
          obligation_type: string
          parameters: Json
          target_fields: string[]
        }
        Insert: {
          created_at?: string
          decision_id: string
          obligation_id?: string
          obligation_type: string
          parameters?: Json
          target_fields?: string[]
        }
        Update: {
          created_at?: string
          decision_id?: string
          obligation_id?: string
          obligation_type?: string
          parameters?: Json
          target_fields?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "governance_obligations_decision_id_fkey"
            columns: ["decision_id"]
            isOneToOne: false
            referencedRelation: "governance_decisions"
            referencedColumns: ["gov_decision_id"]
          },
        ]
      }
      governance_policies: {
        Row: {
          created_at: string
          created_by: string
          current_version_id: string | null
          description: string | null
          governance_policy_id: string
          policy_name: string
          status: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          current_version_id?: string | null
          description?: string | null
          governance_policy_id?: string
          policy_name: string
          status: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          current_version_id?: string | null
          description?: string | null
          governance_policy_id?: string
          policy_name?: string
          status?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "governance_policies_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      governance_policy_data_class_scope: {
        Row: {
          action_type: string
          created_at: string
          data_class: string
          governance_policy_id: string
          scope_item_id: string
          version_id: string
        }
        Insert: {
          action_type: string
          created_at?: string
          data_class: string
          governance_policy_id: string
          scope_item_id?: string
          version_id: string
        }
        Update: {
          action_type?: string
          created_at?: string
          data_class?: string
          governance_policy_id?: string
          scope_item_id?: string
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "governance_policy_data_class_scope_governance_policy_id_fkey"
            columns: ["governance_policy_id"]
            isOneToOne: false
            referencedRelation: "governance_policies"
            referencedColumns: ["governance_policy_id"]
          },
          {
            foreignKeyName: "governance_policy_data_class_scope_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "governance_policy_versions"
            referencedColumns: ["version_id"]
          },
        ]
      }
      governance_policy_rules: {
        Row: {
          condition_type: string
          condition_value: string | null
          created_at: string
          created_by: string
          governance_policy_id: string
          is_enabled: boolean
          obligation_type: string
          operator: string
          rule_id: string
          rule_name: string
          severity: string
          target_fields: string[]
          updated_at: string
          version_id: string
        }
        Insert: {
          condition_type: string
          condition_value?: string | null
          created_at?: string
          created_by: string
          governance_policy_id: string
          is_enabled?: boolean
          obligation_type: string
          operator?: string
          rule_id?: string
          rule_name: string
          severity: string
          target_fields?: string[]
          updated_at?: string
          version_id: string
        }
        Update: {
          condition_type?: string
          condition_value?: string | null
          created_at?: string
          created_by?: string
          governance_policy_id?: string
          is_enabled?: boolean
          obligation_type?: string
          operator?: string
          rule_id?: string
          rule_name?: string
          severity?: string
          target_fields?: string[]
          updated_at?: string
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "governance_policy_rules_governance_policy_id_fkey"
            columns: ["governance_policy_id"]
            isOneToOne: false
            referencedRelation: "governance_policies"
            referencedColumns: ["governance_policy_id"]
          },
          {
            foreignKeyName: "governance_policy_rules_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "governance_policy_versions"
            referencedColumns: ["version_id"]
          },
        ]
      }
      governance_policy_versions: {
        Row: {
          activated_at: string | null
          created_at: string
          created_by: string
          effective_from: string
          effective_to: string
          governance_policy_id: string
          priority: number
          retired_at: string | null
          rollout_scope: string
          status: string
          updated_at: string
          version_id: string
          version_no: string
        }
        Insert: {
          activated_at?: string | null
          created_at?: string
          created_by: string
          effective_from: string
          effective_to: string
          governance_policy_id: string
          priority: number
          retired_at?: string | null
          rollout_scope?: string
          status?: string
          updated_at?: string
          version_id?: string
          version_no: string
        }
        Update: {
          activated_at?: string | null
          created_at?: string
          created_by?: string
          effective_from?: string
          effective_to?: string
          governance_policy_id?: string
          priority?: number
          retired_at?: string | null
          rollout_scope?: string
          status?: string
          updated_at?: string
          version_id?: string
          version_no?: string
        }
        Relationships: [
          {
            foreignKeyName: "governance_policy_versions_governance_policy_id_fkey"
            columns: ["governance_policy_id"]
            isOneToOne: false
            referencedRelation: "governance_policies"
            referencedColumns: ["governance_policy_id"]
          },
        ]
      }
      group_code_sequences: {
        Row: {
          next_sequence: number
          tenant_id: string
        }
        Insert: {
          next_sequence: number
          tenant_id: string
        }
        Update: {
          next_sequence?: number
          tenant_id?: string
        }
        Relationships: []
      }
      group_members: {
        Row: {
          added_by: string
          created_at: string | null
          group_id: string
          is_active: boolean
          membership_id: string
          membership_type: string
          tenant_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          added_by: string
          created_at?: string | null
          group_id: string
          is_active?: boolean
          membership_id?: string
          membership_type: string
          tenant_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          added_by?: string
          created_at?: string | null
          group_id?: string
          is_active?: boolean
          membership_id?: string
          membership_type?: string
          tenant_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["group_id"]
          },
          {
            foreignKeyName: "group_members_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      groups: {
        Row: {
          created_at: string | null
          created_by: string
          description: string
          group_code: string
          group_id: string
          group_name: string
          status: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string
          description: string
          group_code: string
          group_id?: string
          group_name: string
          status: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string
          group_code?: string
          group_id?: string
          group_name?: string
          status?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "groups_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      health_monitor_events: {
        Row: {
          api_endpoint: string | null
          created_at: string
          description: string | null
          detected_at: string
          entity_id: string
          entity_name: string
          entity_type: Database["public"]["Enums"]["health_entity_type"]
          error_code: string | null
          error_message: string | null
          event_id: string
          event_payload: Json | null
          event_type: Database["public"]["Enums"]["health_event_type"]
          http_method: string | null
          is_resolved: boolean
          latency_ms: number | null
          policy_version_id: string | null
          request_id: string | null
          resolved_at: string | null
          resolved_by: string | null
          severity: Database["public"]["Enums"]["health_severity_type"]
          tenant_id: string
          title: string
          trace_id: string | null
          workflow_run_id: string | null
        }
        Insert: {
          api_endpoint?: string | null
          created_at?: string
          description?: string | null
          detected_at?: string
          entity_id: string
          entity_name: string
          entity_type: Database["public"]["Enums"]["health_entity_type"]
          error_code?: string | null
          error_message?: string | null
          event_id?: string
          event_payload?: Json | null
          event_type: Database["public"]["Enums"]["health_event_type"]
          http_method?: string | null
          is_resolved?: boolean
          latency_ms?: number | null
          policy_version_id?: string | null
          request_id?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity: Database["public"]["Enums"]["health_severity_type"]
          tenant_id: string
          title: string
          trace_id?: string | null
          workflow_run_id?: string | null
        }
        Update: {
          api_endpoint?: string | null
          created_at?: string
          description?: string | null
          detected_at?: string
          entity_id?: string
          entity_name?: string
          entity_type?: Database["public"]["Enums"]["health_entity_type"]
          error_code?: string | null
          error_message?: string | null
          event_id?: string
          event_payload?: Json | null
          event_type?: Database["public"]["Enums"]["health_event_type"]
          http_method?: string | null
          is_resolved?: boolean
          latency_ms?: number | null
          policy_version_id?: string | null
          request_id?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: Database["public"]["Enums"]["health_severity_type"]
          tenant_id?: string
          title?: string
          trace_id?: string | null
          workflow_run_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "health_monitor_events_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      health_monitor_snapshots: {
        Row: {
          compliance_score: number | null
          created_at: string
          critical_count: number | null
          entity_id: string | null
          entity_name: string
          entity_type: Database["public"]["Enums"]["health_entity_type"]
          error_rate: number | null
          failed_runs_24h: number | null
          last_check_at: string
          last_failure_at: string | null
          last_success_at: string | null
          latency_p95_ms: number | null
          metadata: Json | null
          rps: number | null
          snapshot_id: string
          source_reference: Json | null
          status: Database["public"]["Enums"]["health_status_type"]
          success_rate: number | null
          tenant_id: string
          total_runs_24h: number | null
          updated_at: string
          warning_count: number | null
        }
        Insert: {
          compliance_score?: number | null
          created_at?: string
          critical_count?: number | null
          entity_id?: string | null
          entity_name: string
          entity_type: Database["public"]["Enums"]["health_entity_type"]
          error_rate?: number | null
          failed_runs_24h?: number | null
          last_check_at?: string
          last_failure_at?: string | null
          last_success_at?: string | null
          latency_p95_ms?: number | null
          metadata?: Json | null
          rps?: number | null
          snapshot_id?: string
          source_reference?: Json | null
          status?: Database["public"]["Enums"]["health_status_type"]
          success_rate?: number | null
          tenant_id: string
          total_runs_24h?: number | null
          updated_at?: string
          warning_count?: number | null
        }
        Update: {
          compliance_score?: number | null
          created_at?: string
          critical_count?: number | null
          entity_id?: string | null
          entity_name?: string
          entity_type?: Database["public"]["Enums"]["health_entity_type"]
          error_rate?: number | null
          failed_runs_24h?: number | null
          last_check_at?: string
          last_failure_at?: string | null
          last_success_at?: string | null
          latency_p95_ms?: number | null
          metadata?: Json | null
          rps?: number | null
          snapshot_id?: string
          source_reference?: Json | null
          status?: Database["public"]["Enums"]["health_status_type"]
          success_rate?: number | null
          tenant_id?: string
          total_runs_24h?: number | null
          updated_at?: string
          warning_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "health_monitor_snapshots_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      idempotency_keys: {
        Row: {
          created_at: string
          request_id: string
          response: Json
        }
        Insert: {
          created_at?: string
          request_id: string
          response: Json
        }
        Update: {
          created_at?: string
          request_id?: string
          response?: Json
        }
        Relationships: []
      }
      key_scopes: {
        Row: {
          created_at: string | null
          data_class_id: string | null
          is_active: boolean
          key_version: number
          purpose: string
          tenant_id: string | null
          uuid: string
        }
        Insert: {
          created_at?: string | null
          data_class_id?: string | null
          is_active?: boolean
          key_version?: number
          purpose: string
          tenant_id?: string | null
          uuid?: string
        }
        Update: {
          created_at?: string | null
          data_class_id?: string | null
          is_active?: boolean
          key_version?: number
          purpose?: string
          tenant_id?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "key_scopes_data_class_id_fkey"
            columns: ["data_class_id"]
            isOneToOne: false
            referencedRelation: "data_classes"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "key_scopes_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      ledger: {
        Row: {
          created_at: string | null
          created_by: string
          description: string
          ledger_id: string
          ledger_name: string
          ledger_type: string
          owner_id: string
          owner_type: string
          status: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description: string
          ledger_id?: string
          ledger_name: string
          ledger_type: string
          owner_id: string
          owner_type: string
          status?: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string
          ledger_id?: string
          ledger_name?: string
          ledger_type?: string
          owner_id?: string
          owner_type?: string
          status?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ledger_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      ledger_account: {
        Row: {
          account_id: string
          account_name: string
          account_type: string
          created_at: string | null
          created_by: string
          ledger_id: string
          parent_account_id: string | null
          updated_at: string | null
        }
        Insert: {
          account_id?: string
          account_name: string
          account_type: string
          created_at?: string | null
          created_by: string
          ledger_id: string
          parent_account_id?: string | null
          updated_at?: string | null
        }
        Update: {
          account_id?: string
          account_name?: string
          account_type?: string
          created_at?: string | null
          created_by?: string
          ledger_id?: string
          parent_account_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ledger_account_ledger_id_fkey"
            columns: ["ledger_id"]
            isOneToOne: false
            referencedRelation: "ledger"
            referencedColumns: ["ledger_id"]
          },
          {
            foreignKeyName: "ledger_account_parent_account_id_fkey"
            columns: ["parent_account_id"]
            isOneToOne: false
            referencedRelation: "ledger_account"
            referencedColumns: ["account_id"]
          },
        ]
      }
      ledger_lifecycle: {
        Row: {
          action: string
          created_at: string | null
          effective_date: string | null
          ledger_id: string
          lifecycle_id: string
          new_status: string
          performed_by: string
          previous_status: string | null
          reason: string | null
          updated_at: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          effective_date?: string | null
          ledger_id: string
          lifecycle_id?: string
          new_status: string
          performed_by: string
          previous_status?: string | null
          reason?: string | null
          updated_at?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          effective_date?: string | null
          ledger_id?: string
          lifecycle_id?: string
          new_status?: string
          performed_by?: string
          previous_status?: string | null
          reason?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ledger_lifecycle_ledger_id_fkey"
            columns: ["ledger_id"]
            isOneToOne: false
            referencedRelation: "ledger"
            referencedColumns: ["ledger_id"]
          },
        ]
      }
      ledger_metadata: {
        Row: {
          created_at: string | null
          created_by: string
          data_sensitivity: string
          entity_id: string
          entity_type: string
          metadata_id: string
          regulatory_classification: string
          reporting_category: string
          tags: string[] | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          data_sensitivity: string
          entity_id: string
          entity_type: string
          metadata_id?: string
          regulatory_classification: string
          reporting_category: string
          tags?: string[] | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          data_sensitivity?: string
          entity_id?: string
          entity_type?: string
          metadata_id?: string
          regulatory_classification?: string
          reporting_category?: string
          tags?: string[] | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ledger_metadata_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      ledger_schema: {
        Row: {
          created_at: string | null
          defined_by: string
          ledger_id: string
          published_at: string | null
          schema_id: string
          status: string
          updated_at: string | null
          version: string
        }
        Insert: {
          created_at?: string | null
          defined_by: string
          ledger_id: string
          published_at?: string | null
          schema_id?: string
          status?: string
          updated_at?: string | null
          version: string
        }
        Update: {
          created_at?: string | null
          defined_by?: string
          ledger_id?: string
          published_at?: string | null
          schema_id?: string
          status?: string
          updated_at?: string | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "ledger_schema_ledger_id_fkey"
            columns: ["ledger_id"]
            isOneToOne: false
            referencedRelation: "ledger"
            referencedColumns: ["ledger_id"]
          },
        ]
      }
      ledger_schema_fields: {
        Row: {
          data_type: string
          description: string | null
          field_id: string
          field_name: string
          required: boolean | null
          schema_id: string
        }
        Insert: {
          data_type: string
          description?: string | null
          field_id?: string
          field_name: string
          required?: boolean | null
          schema_id: string
        }
        Update: {
          data_type?: string
          description?: string | null
          field_id?: string
          field_name?: string
          required?: boolean | null
          schema_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ledger_schema_fields_schema_id_fkey"
            columns: ["schema_id"]
            isOneToOne: false
            referencedRelation: "ledger_schema"
            referencedColumns: ["schema_id"]
          },
        ]
      }
      ledger_schema_rules: {
        Row: {
          field_name: string | null
          rule_id: string
          rule_type: string
          schema_id: string
        }
        Insert: {
          field_name?: string | null
          rule_id?: string
          rule_type: string
          schema_id: string
        }
        Update: {
          field_name?: string | null
          rule_id?: string
          rule_type?: string
          schema_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ledger_schema_rules_schema_id_fkey"
            columns: ["schema_id"]
            isOneToOne: false
            referencedRelation: "ledger_schema"
            referencedColumns: ["schema_id"]
          },
        ]
      }
      legal_document_versions: {
        Row: {
          activation_mode: string | null
          change_description: string | null
          content_hash: string | null
          content_url: string
          created_at: string | null
          created_by: string
          document_id: string | null
          document_version_id: string
          effective_date: string
          requires_reconsent: boolean | null
          status: string
          updated_at: string | null
          version_number: string
        }
        Insert: {
          activation_mode?: string | null
          change_description?: string | null
          content_hash?: string | null
          content_url: string
          created_at?: string | null
          created_by: string
          document_id?: string | null
          document_version_id?: string
          effective_date: string
          requires_reconsent?: boolean | null
          status: string
          updated_at?: string | null
          version_number: string
        }
        Update: {
          activation_mode?: string | null
          change_description?: string | null
          content_hash?: string | null
          content_url?: string
          created_at?: string | null
          created_by?: string
          document_id?: string | null
          document_version_id?: string
          effective_date?: string
          requires_reconsent?: boolean | null
          status?: string
          updated_at?: string | null
          version_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "legal_document_versions_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "legal_documents"
            referencedColumns: ["document_id"]
          },
        ]
      }
      legal_documents: {
        Row: {
          created_at: string | null
          created_by: string
          document_description: string | null
          document_id: string
          document_name: string
          document_owner: string
          document_type: string
          status: string
          tags: Json | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          document_description?: string | null
          document_id?: string
          document_name: string
          document_owner: string
          document_type: string
          status?: string
          tags?: Json | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          document_description?: string | null
          document_id?: string
          document_name?: string
          document_owner?: string
          document_type?: string
          status?: string
          tags?: Json | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "legal_documents_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      micro_apps: {
        Row: {
          app_id: string
          created_at: string | null
          name: string
          updated_at: string | null
          uuid: string
        }
        Insert: {
          app_id: string
          created_at?: string | null
          name: string
          updated_at?: string | null
          uuid?: string
        }
        Update: {
          app_id?: string
          created_at?: string | null
          name?: string
          updated_at?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "micro_apps_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "applications_registry"
            referencedColumns: ["app_id"]
          },
        ]
      }
      microservices: {
        Row: {
          api_endpoint: string | null
          archived: boolean | null
          created_at: string | null
          created_by: string
          functions_code: string | null
          name: string
          scope: string | null
          service_id: string
          status: string
          tenant_id: string
          updated_at: string | null
          uuid: string
          version: string | null
        }
        Insert: {
          api_endpoint?: string | null
          archived?: boolean | null
          created_at?: string | null
          created_by: string
          functions_code?: string | null
          name: string
          scope?: string | null
          service_id: string
          status?: string
          tenant_id: string
          updated_at?: string | null
          uuid?: string
          version?: string | null
        }
        Update: {
          api_endpoint?: string | null
          archived?: boolean | null
          created_at?: string | null
          created_by?: string
          functions_code?: string | null
          name?: string
          scope?: string | null
          service_id?: string
          status?: string
          tenant_id?: string
          updated_at?: string | null
          uuid?: string
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "microservices_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "service_register"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "microservices_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      module_permissions: {
        Row: {
          action: string
          application_id: string
          created_at: string | null
          module_id: string
          permission_code: string
          uuid: string
        }
        Insert: {
          action: string
          application_id: string
          created_at?: string | null
          module_id: string
          permission_code: string
          uuid?: string
        }
        Update: {
          action?: string
          application_id?: string
          created_at?: string | null
          module_id?: string
          permission_code?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "module_permissions_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications_registry"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "module_permissions_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "applications_modules"
            referencedColumns: ["uuid"]
          },
        ]
      }
      onboarding_state_log: {
        Row: {
          actor: string
          created_at: string
          intent: string
          onboarding_id: string
          reason_code: string | null
          record_id: string
          request_id: string
          source_system: string
          state: string
          tenant_id: string | null
          trace_id: string
        }
        Insert: {
          actor: string
          created_at?: string
          intent: string
          onboarding_id: string
          reason_code?: string | null
          record_id?: string
          request_id: string
          source_system: string
          state: string
          tenant_id?: string | null
          trace_id: string
        }
        Update: {
          actor?: string
          created_at?: string
          intent?: string
          onboarding_id?: string
          reason_code?: string | null
          record_id?: string
          request_id?: string
          source_system?: string
          state?: string
          tenant_id?: string | null
          trace_id?: string
        }
        Relationships: []
      }
      org_relationships: {
        Row: {
          child_org_unit_id: string
          created_at: string | null
          created_by: string
          effective_from: string | null
          is_active: boolean
          parent_org_unit_id: string
          tenant_id: string
          updated_at: string | null
          uuid: string
        }
        Insert: {
          child_org_unit_id: string
          created_at?: string | null
          created_by: string
          effective_from?: string | null
          is_active: boolean
          parent_org_unit_id: string
          tenant_id: string
          updated_at?: string | null
          uuid?: string
        }
        Update: {
          child_org_unit_id?: string
          created_at?: string | null
          created_by?: string
          effective_from?: string | null
          is_active?: boolean
          parent_org_unit_id?: string
          tenant_id?: string
          updated_at?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_relationships_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      org_units: {
        Row: {
          created_at: string
          created_by: string
          description: string
          org_unit_name: string
          org_unit_type: string
          status: string
          tenant_id: string
          updated_at: string
          uuid: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description: string
          org_unit_name: string
          org_unit_type: string
          status: string
          tenant_id: string
          updated_at?: string
          uuid?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string
          org_unit_name?: string
          org_unit_type?: string
          status?: string
          tenant_id?: string
          updated_at?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_units_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      organization_members: {
        Row: {
          activation_details: string | null
          archived: boolean | null
          assigned_on: string | null
          avatar_url: string | null
          business_unit: string | null
          business_unit_id: string | null
          created_at: string | null
          designation: string | null
          email: string
          expiry_details: string | null
          full_name: string
          invitation_status: string
          invite_user: boolean | null
          mobile_number: string | null
          reporting_manager: string | null
          role: string
          role_id: string | null
          setup_complete: boolean | null
          status: string | null
          tenant_id: string
          type: string | null
          updated_at: string | null
          user_id: string | null
          uuid: string
        }
        Insert: {
          activation_details?: string | null
          archived?: boolean | null
          assigned_on?: string | null
          avatar_url?: string | null
          business_unit?: string | null
          business_unit_id?: string | null
          created_at?: string | null
          designation?: string | null
          email: string
          expiry_details?: string | null
          full_name: string
          invitation_status: string
          invite_user?: boolean | null
          mobile_number?: string | null
          reporting_manager?: string | null
          role: string
          role_id?: string | null
          setup_complete?: boolean | null
          status?: string | null
          tenant_id: string
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
          uuid?: string
        }
        Update: {
          activation_details?: string | null
          archived?: boolean | null
          assigned_on?: string | null
          avatar_url?: string | null
          business_unit?: string | null
          business_unit_id?: string | null
          created_at?: string | null
          designation?: string | null
          email?: string
          expiry_details?: string | null
          full_name?: string
          invitation_status?: string
          invite_user?: boolean | null
          mobile_number?: string | null
          reporting_manager?: string | null
          role?: string
          role_id?: string | null
          setup_complete?: boolean | null
          status?: string | null
          tenant_id?: string
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_business_unit_id_fkey"
            columns: ["business_unit_id"]
            isOneToOne: false
            referencedRelation: "org_units"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "organization_members_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "organization_members_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      organizations: {
        Row: {
          archived: boolean | null
          country: string | null
          created_at: string | null
          domain: string | null
          is_active: boolean | null
          name: string
          type: string | null
          updated_at: string | null
          uuid: string
        }
        Insert: {
          archived?: boolean | null
          country?: string | null
          created_at?: string | null
          domain?: string | null
          is_active?: boolean | null
          name: string
          type?: string | null
          updated_at?: string | null
          uuid?: string
        }
        Update: {
          archived?: boolean | null
          country?: string | null
          created_at?: string | null
          domain?: string | null
          is_active?: boolean | null
          name?: string
          type?: string | null
          updated_at?: string | null
          uuid?: string
        }
        Relationships: []
      }
      pending_signup_projected_events: {
        Row: {
          event_id: string
          occurred_at: string
          pending_signup_id: string
          projected_at: string
        }
        Insert: {
          event_id: string
          occurred_at: string
          pending_signup_id: string
          projected_at?: string
        }
        Update: {
          event_id?: string
          occurred_at?: string
          pending_signup_id?: string
          projected_at?: string
        }
        Relationships: []
      }
      pending_signups: {
        Row: {
          attempt_count: number
          created_at: string
          email: string
          idempotency_key: string
          last_projected_event_at: string | null
          last_verification_sent_at: string | null
          name: string | null
          password_hash: Json
          status: string
          tentant_id: string | null
          trace_id: string | null
          user_id: string | null
          uuid: string
        }
        Insert: {
          attempt_count?: number
          created_at?: string
          email: string
          idempotency_key: string
          last_projected_event_at?: string | null
          last_verification_sent_at?: string | null
          name?: string | null
          password_hash: Json
          status: string
          tentant_id?: string | null
          trace_id?: string | null
          user_id?: string | null
          uuid?: string
        }
        Update: {
          attempt_count?: number
          created_at?: string
          email?: string
          idempotency_key?: string
          last_projected_event_at?: string | null
          last_verification_sent_at?: string | null
          name?: string | null
          password_hash?: Json
          status?: string
          tentant_id?: string | null
          trace_id?: string | null
          user_id?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "pending_signups_tentant_id_fkey"
            columns: ["tentant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      permission_actions: {
        Row: {
          action_name: string
          uuid: string
        }
        Insert: {
          action_name: string
          uuid?: string
        }
        Update: {
          action_name?: string
          uuid?: string
        }
        Relationships: []
      }
      permission_matrix: {
        Row: {
          application_id: string
          archived: boolean | null
          created_at: string | null
          name: string
          permissions_jsonb: Json
          updated_at: string | null
          uuid: string
        }
        Insert: {
          application_id: string
          archived?: boolean | null
          created_at?: string | null
          name: string
          permissions_jsonb: Json
          updated_at?: string | null
          uuid?: string
        }
        Update: {
          application_id?: string
          archived?: boolean | null
          created_at?: string | null
          name?: string
          permissions_jsonb?: Json
          updated_at?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "permission_matrix_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["uuid"]
          },
        ]
      }
      permissions: {
        Row: {
          action_name: string
          allowed_resource_scopes: string[]
          created_at: string
          created_by: string
          dependency_rules: Json | null
          feature_name: string
          risk_level: string | null
          system_defined: boolean
          updated_at: string
          uuid: string
        }
        Insert: {
          action_name: string
          allowed_resource_scopes: string[]
          created_at?: string
          created_by?: string
          dependency_rules?: Json | null
          feature_name: string
          risk_level?: string | null
          system_defined?: boolean
          updated_at?: string
          uuid?: string
        }
        Update: {
          action_name?: string
          allowed_resource_scopes?: string[]
          created_at?: string
          created_by?: string
          dependency_rules?: Json | null
          feature_name?: string
          risk_level?: string | null
          system_defined?: boolean
          updated_at?: string
          uuid?: string
        }
        Relationships: []
      }
      plan: {
        Row: {
          additional_users: string
          admin_tenants: number
          billing_cycle: string
          created_at: string | null
          created_by: string
          currency: string
          description: string | null
          features: string[]
          included_users: number
          plan_id: string
          plan_name: string
          plan_template_id: string
          plan_tier: string
          price: string
          status: string
          storage_limit_gb: number
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          additional_users: string
          admin_tenants: number
          billing_cycle: string
          created_at?: string | null
          created_by: string
          currency: string
          description?: string | null
          features: string[]
          included_users: number
          plan_id?: string
          plan_name: string
          plan_template_id: string
          plan_tier: string
          price: string
          status?: string
          storage_limit_gb: number
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          additional_users?: string
          admin_tenants?: number
          billing_cycle?: string
          created_at?: string | null
          created_by?: string
          currency?: string
          description?: string | null
          features?: string[]
          included_users?: number
          plan_id?: string
          plan_name?: string
          plan_template_id?: string
          plan_tier?: string
          price?: string
          status?: string
          storage_limit_gb?: number
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plan_plan_template_id_fkey"
            columns: ["plan_template_id"]
            isOneToOne: false
            referencedRelation: "plan_templates"
            referencedColumns: ["plan_template_id"]
          },
          {
            foreignKeyName: "plan_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      plan_templates: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          plan_template_id: string
          status: string
          template_name: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          plan_template_id?: string
          status?: string
          template_name: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          plan_template_id?: string
          status?: string
          template_name?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plan_templates_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      policies: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          policy_code: string
          policy_id: string
          policy_name: string
          policy_type: string
          status: string | null
          tenant_id: string
          updated_at: string
          version: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          policy_code: string
          policy_id?: string
          policy_name: string
          policy_type: string
          status?: string | null
          tenant_id: string
          updated_at?: string
          version: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          policy_code?: string
          policy_id?: string
          policy_name?: string
          policy_type?: string
          status?: string | null
          tenant_id?: string
          updated_at?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "policies_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      policy_assignments: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          assignment_id: string
          enforcement_mode: string
          is_active: boolean | null
          policy_id: string | null
          scope_id: string
          tenant_id: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          assignment_id?: string
          enforcement_mode: string
          is_active?: boolean | null
          policy_id?: string | null
          scope_id: string
          tenant_id?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          assignment_id?: string
          enforcement_mode?: string
          is_active?: boolean | null
          policy_id?: string | null
          scope_id?: string
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "policy_assignments_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["policy_id"]
          },
          {
            foreignKeyName: "policy_assignments_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      policy_attribute_operators: {
        Row: {
          attribute_key: string
          created_at: string | null
          operator: string
        }
        Insert: {
          attribute_key: string
          created_at?: string | null
          operator: string
        }
        Update: {
          attribute_key?: string
          created_at?: string | null
          operator?: string
        }
        Relationships: [
          {
            foreignKeyName: "policy_attribute_operators_attribute_key_fkey"
            columns: ["attribute_key"]
            isOneToOne: false
            referencedRelation: "policy_attributes"
            referencedColumns: ["attribute_key"]
          },
        ]
      }
      policy_attributes: {
        Row: {
          attribute_key: string
          category: string
          created_at: string | null
          description: string | null
          display_name: string
          is_active: boolean | null
          value_source: string
          value_type: string
        }
        Insert: {
          attribute_key: string
          category: string
          created_at?: string | null
          description?: string | null
          display_name: string
          is_active?: boolean | null
          value_source: string
          value_type: string
        }
        Update: {
          attribute_key?: string
          category?: string
          created_at?: string | null
          description?: string | null
          display_name?: string
          is_active?: boolean | null
          value_source?: string
          value_type?: string
        }
        Relationships: []
      }
      policy_bundle_cache: {
        Row: {
          action: string
          cache_id: string
          created_at: string
          policy_bundle: Json
          resolved_state: string
          resource_type: string
          tenant_id: string
          ttl: string
          updated_at: string
          version: string
        }
        Insert: {
          action: string
          cache_id?: string
          created_at?: string
          policy_bundle: Json
          resolved_state?: string
          resource_type: string
          tenant_id: string
          ttl: string
          updated_at?: string
          version: string
        }
        Update: {
          action?: string
          cache_id?: string
          created_at?: string
          policy_bundle?: Json
          resolved_state?: string
          resource_type?: string
          tenant_id?: string
          ttl?: string
          updated_at?: string
          version?: string
        }
        Relationships: []
      }
      policy_bundles: {
        Row: {
          bundle_id: string
          created_at: string
          description: string | null
          name: string
          version: string
        }
        Insert: {
          bundle_id?: string
          created_at?: string
          description?: string | null
          name: string
          version: string
        }
        Update: {
          bundle_id?: string
          created_at?: string
          description?: string | null
          name?: string
          version?: string
        }
        Relationships: []
      }
      policy_code_sequences: {
        Row: {
          next_sequence: number
          tenant_id: string
        }
        Insert: {
          next_sequence: number
          tenant_id: string
        }
        Update: {
          next_sequence?: number
          tenant_id?: string
        }
        Relationships: []
      }
      policy_decisions: {
        Row: {
          action: string | null
          assignment_id: string | null
          created_at: string | null
          decision: string | null
          decision_id: string
          evaluated_at: string | null
          matched_rules: Json | null
          obligations: Json | null
          policy_id: string | null
          reason: string | null
          resource_type: string | null
          rule_id: string | null
          span_id: string | null
          subject_id: string | null
          tenant_id: string | null
          trace_id: string | null
        }
        Insert: {
          action?: string | null
          assignment_id?: string | null
          created_at?: string | null
          decision?: string | null
          decision_id?: string
          evaluated_at?: string | null
          matched_rules?: Json | null
          obligations?: Json | null
          policy_id?: string | null
          reason?: string | null
          resource_type?: string | null
          rule_id?: string | null
          span_id?: string | null
          subject_id?: string | null
          tenant_id?: string | null
          trace_id?: string | null
        }
        Update: {
          action?: string | null
          assignment_id?: string | null
          created_at?: string | null
          decision?: string | null
          decision_id?: string
          evaluated_at?: string | null
          matched_rules?: Json | null
          obligations?: Json | null
          policy_id?: string | null
          reason?: string | null
          resource_type?: string | null
          rule_id?: string | null
          span_id?: string | null
          subject_id?: string | null
          tenant_id?: string | null
          trace_id?: string | null
        }
        Relationships: []
      }
      policy_health_metrics: {
        Row: {
          compliant: boolean
          decision: string
          drift_detected: boolean | null
          evaluated_at: string
          metadata: Json | null
          metric_id: string
          policy_id: string
          policy_name: string
          policy_version_id: string | null
          request_id: string | null
          tenant_id: string
          trace_id: string | null
          violation_count: number | null
        }
        Insert: {
          compliant?: boolean
          decision: string
          drift_detected?: boolean | null
          evaluated_at?: string
          metadata?: Json | null
          metric_id?: string
          policy_id: string
          policy_name: string
          policy_version_id?: string | null
          request_id?: string | null
          tenant_id: string
          trace_id?: string | null
          violation_count?: number | null
        }
        Update: {
          compliant?: boolean
          decision?: string
          drift_detected?: boolean | null
          evaluated_at?: string
          metadata?: Json | null
          metric_id?: string
          policy_id?: string
          policy_name?: string
          policy_version_id?: string | null
          request_id?: string | null
          tenant_id?: string
          trace_id?: string | null
          violation_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "policy_health_metrics_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      policy_operators: {
        Row: {
          description: string
          display_label: string
          operator_code: string
        }
        Insert: {
          description: string
          display_label: string
          operator_code: string
        }
        Update: {
          description?: string
          display_label?: string
          operator_code?: string
        }
        Relationships: []
      }
      policy_rules: {
        Row: {
          created_at: string | null
          created_by: string
          is_active: boolean | null
          policy_id: string | null
          rule_definition: Json
          rule_id: string
          rule_name: string
          updated_at: string | null
          version: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          is_active?: boolean | null
          policy_id?: string | null
          rule_definition: Json
          rule_id: string
          rule_name: string
          updated_at?: string | null
          version: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          is_active?: boolean | null
          policy_id?: string | null
          rule_definition?: Json
          rule_id?: string
          rule_name?: string
          updated_at?: string | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "policy_rules_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["policy_id"]
          },
        ]
      }
      policy_versions: {
        Row: {
          created_at: string | null
          created_by: string
          effective_from: string
          effective_until: string | null
          policy_id: string
          policy_version_id: string
          reason: string | null
          status: string
          tenant_id: string
          updated_at: string | null
          version_label: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          effective_from: string
          effective_until?: string | null
          policy_id: string
          policy_version_id?: string
          reason?: string | null
          status: string
          tenant_id: string
          updated_at?: string | null
          version_label: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          effective_from?: string
          effective_until?: string | null
          policy_id?: string
          policy_version_id?: string
          reason?: string | null
          status?: string
          tenant_id?: string
          updated_at?: string | null
          version_label?: string
        }
        Relationships: [
          {
            foreignKeyName: "policy_versions_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["policy_id"]
          },
          {
            foreignKeyName: "policy_versions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      provider_configuration_reference: {
        Row: {
          channel: string
          config_id: string
          created_at: string | null
          endpoint: string | null
          provider_name: string
          tenant_id: string
          updated_at: string | null
          vault_reference: string
        }
        Insert: {
          channel: string
          config_id?: string
          created_at?: string | null
          endpoint?: string | null
          provider_name: string
          tenant_id: string
          updated_at?: string | null
          vault_reference: string
        }
        Update: {
          channel?: string
          config_id?: string
          created_at?: string | null
          endpoint?: string | null
          provider_name?: string
          tenant_id?: string
          updated_at?: string | null
          vault_reference?: string
        }
        Relationships: []
      }
      provider_connectivity_test: {
        Row: {
          channel: string
          credential_validation_result: string | null
          error_code: string | null
          error_message: string | null
          http_status: number | null
          latency_ms: number | null
          provider_health_status: string | null
          provider_name: string
          rate_limit_limit: number | null
          rate_limit_remaining: number | null
          rate_limit_reset_at: string | null
          tenant_id: string
          test_id: string
          tested_at: string | null
          tested_by: string | null
          trace_id: string | null
        }
        Insert: {
          channel: string
          credential_validation_result?: string | null
          error_code?: string | null
          error_message?: string | null
          http_status?: number | null
          latency_ms?: number | null
          provider_health_status?: string | null
          provider_name: string
          rate_limit_limit?: number | null
          rate_limit_remaining?: number | null
          rate_limit_reset_at?: string | null
          tenant_id: string
          test_id?: string
          tested_at?: string | null
          tested_by?: string | null
          trace_id?: string | null
        }
        Update: {
          channel?: string
          credential_validation_result?: string | null
          error_code?: string | null
          error_message?: string | null
          http_status?: number | null
          latency_ms?: number | null
          provider_health_status?: string | null
          provider_name?: string
          rate_limit_limit?: number | null
          rate_limit_remaining?: number | null
          rate_limit_reset_at?: string | null
          tenant_id?: string
          test_id?: string
          tested_at?: string | null
          tested_by?: string | null
          trace_id?: string | null
        }
        Relationships: []
      }
      provider_sandbox_registry: {
        Row: {
          active: boolean
          created_at: string
          is_sandbox_only: boolean
          provider_id: string
          sandbox_endpoint: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          is_sandbox_only?: boolean
          provider_id: string
          sandbox_endpoint: string
        }
        Update: {
          active?: boolean
          created_at?: string
          is_sandbox_only?: boolean
          provider_id?: string
          sandbox_endpoint?: string
        }
        Relationships: []
      }
      quota_policies: {
        Row: {
          app_id: string
          created_at: string | null
          created_by: string
          effective_from: string
          effective_until: string | null
          enforcement_mode: string
          feature: string | null
          is_active: boolean | null
          limit_value: number
          period: string
          plan_id: string
          published_at: string | null
          quota_policy_id: string
          status: string
          tenant_id: string
          updated_at: string | null
          version: number
        }
        Insert: {
          app_id: string
          created_at?: string | null
          created_by: string
          effective_from: string
          effective_until?: string | null
          enforcement_mode: string
          feature?: string | null
          is_active?: boolean | null
          limit_value: number
          period: string
          plan_id: string
          published_at?: string | null
          quota_policy_id?: string
          status?: string
          tenant_id: string
          updated_at?: string | null
          version: number
        }
        Update: {
          app_id?: string
          created_at?: string | null
          created_by?: string
          effective_from?: string
          effective_until?: string | null
          enforcement_mode?: string
          feature?: string | null
          is_active?: boolean | null
          limit_value?: number
          period?: string
          plan_id?: string
          published_at?: string | null
          quota_policy_id?: string
          status?: string
          tenant_id?: string
          updated_at?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "quota_policies_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "applications_registry"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "quota_policies_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plan"
            referencedColumns: ["plan_id"]
          },
          {
            foreignKeyName: "quota_policies_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      redirect_allow_list: {
        Row: {
          allowed_host: string
          allowed_scheme: string
          archived: boolean
          context: string
          created_at: string
          id: string
          tenant_id: string | null
        }
        Insert: {
          allowed_host: string
          allowed_scheme?: string
          archived?: boolean
          context: string
          created_at?: string
          id?: string
          tenant_id?: string | null
        }
        Update: {
          allowed_host?: string
          allowed_scheme?: string
          archived?: boolean
          context?: string
          created_at?: string
          id?: string
          tenant_id?: string | null
        }
        Relationships: []
      }
      risk_model_versions: {
        Row: {
          active_flag: boolean | null
          created_at: string
          created_by: string
          effective_from: string | null
          lifecycle_reason: string | null
          published_at: string | null
          risk_model_id: string
          risk_version_id: string
          status: string
          updated_at: string
          version: string
        }
        Insert: {
          active_flag?: boolean | null
          created_at?: string
          created_by: string
          effective_from?: string | null
          lifecycle_reason?: string | null
          published_at?: string | null
          risk_model_id: string
          risk_version_id?: string
          status: string
          updated_at?: string
          version: string
        }
        Update: {
          active_flag?: boolean | null
          created_at?: string
          created_by?: string
          effective_from?: string | null
          lifecycle_reason?: string | null
          published_at?: string | null
          risk_model_id?: string
          risk_version_id?: string
          status?: string
          updated_at?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "risk_model_versions_risk_model_id_fkey"
            columns: ["risk_model_id"]
            isOneToOne: false
            referencedRelation: "risk_models"
            referencedColumns: ["risk_model_id"]
          },
        ]
      }
      risk_models: {
        Row: {
          created_at: string
          created_by: string
          description: string
          model_name: string
          risk_model_id: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description: string
          model_name: string
          risk_model_id?: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string
          model_name?: string
          risk_model_id?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "risk_models_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      risk_multipliers: {
        Row: {
          created_at: string | null
          model_version_id: string
          multiplier_code: string
          multiplier_value: number
          uuid: string
        }
        Insert: {
          created_at?: string | null
          model_version_id: string
          multiplier_code: string
          multiplier_value: number
          uuid?: string
        }
        Update: {
          created_at?: string | null
          model_version_id?: string
          multiplier_code?: string
          multiplier_value?: number
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_multiplier_version"
            columns: ["model_version_id"]
            isOneToOne: false
            referencedRelation: "risk_model_versions"
            referencedColumns: ["risk_version_id"]
          },
        ]
      }
      risk_thresholds: {
        Row: {
          created_at: string | null
          high_threshold: number
          low_threshold: number
          medium_threshold: number
          model_version_id: string
          uuid: string
        }
        Insert: {
          created_at?: string | null
          high_threshold: number
          low_threshold: number
          medium_threshold: number
          model_version_id: string
          uuid?: string
        }
        Update: {
          created_at?: string | null
          high_threshold?: number
          low_threshold?: number
          medium_threshold?: number
          model_version_id?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_threshold_version"
            columns: ["model_version_id"]
            isOneToOne: true
            referencedRelation: "risk_model_versions"
            referencedColumns: ["risk_version_id"]
          },
        ]
      }
      risk_weights: {
        Row: {
          created_at: string | null
          factor_code: string
          model_version_id: string
          uuid: string
          weight: number
        }
        Insert: {
          created_at?: string | null
          factor_code: string
          model_version_id: string
          uuid?: string
          weight: number
        }
        Update: {
          created_at?: string | null
          factor_code?: string
          model_version_id?: string
          uuid?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_weight_version"
            columns: ["model_version_id"]
            isOneToOne: false
            referencedRelation: "risk_model_versions"
            referencedColumns: ["risk_version_id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          permission_id: string
          role_id: string
        }
        Insert: {
          permission_id: string
          role_id: string
        }
        Update: {
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["uuid"]
          },
        ]
      }
      role_policies: {
        Row: {
          action: string
          bundle_id: string
          condition: Json
          created_at: string
          description: string | null
          policy_id: string
          resource_type: string
        }
        Insert: {
          action: string
          bundle_id: string
          condition: Json
          created_at?: string
          description?: string | null
          policy_id?: string
          resource_type?: string
        }
        Update: {
          action?: string
          bundle_id?: string
          condition?: Json
          created_at?: string
          description?: string | null
          policy_id?: string
          resource_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_policies_bundle_id_fkey"
            columns: ["bundle_id"]
            isOneToOne: false
            referencedRelation: "policy_bundles"
            referencedColumns: ["bundle_id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          name: string
          publish_reason: string | null
          role_type: string
          scope: string | null
          status: string
          system_defined: boolean
          tenant_id: string | null
          updated_at: string
          uuid: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          name: string
          publish_reason?: string | null
          role_type: string
          scope?: string | null
          status: string
          system_defined?: boolean
          tenant_id?: string | null
          updated_at?: string
          uuid?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          name?: string
          publish_reason?: string | null
          role_type?: string
          scope?: string | null
          status?: string
          system_defined?: boolean
          tenant_id?: string | null
          updated_at?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      route_idempotency_records: {
        Row: {
          created_at: string
          event_id: string
          fingerprint: string
          id: string
          idempotency_key: string
          route_id: string
          tenant_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          fingerprint: string
          id?: string
          idempotency_key: string
          route_id: string
          tenant_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          fingerprint?: string
          id?: string
          idempotency_key?: string
          route_id?: string
          tenant_id?: string
        }
        Relationships: []
      }
      route_isolation_store: {
        Row: {
          created_at: string
          event_id: string
          headers: Json
          isolated_at: string
          isolation_id: string
          isolation_type: string
          original_payload: Json
          reason_codes: Json
          redrive_eligible: boolean
          route_id: string
          routing_plan_id: string
          tenant_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          headers: Json
          isolated_at?: string
          isolation_id: string
          isolation_type: string
          original_payload: Json
          reason_codes: Json
          redrive_eligible: boolean
          route_id: string
          routing_plan_id: string
          tenant_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          headers?: Json
          isolated_at?: string
          isolation_id?: string
          isolation_type?: string
          original_payload?: Json
          reason_codes?: Json
          redrive_eligible?: boolean
          route_id?: string
          routing_plan_id?: string
          tenant_id?: string
        }
        Relationships: []
      }
      routing_delivery_latest: {
        Row: {
          current_state: string
          event_id: string
          last_recorded_at: string
          previous_state: string | null
          route_id: string
          routing_plan_id: string
          tenant_id: string
        }
        Insert: {
          current_state: string
          event_id: string
          last_recorded_at?: string
          previous_state?: string | null
          route_id: string
          routing_plan_id: string
          tenant_id: string
        }
        Update: {
          current_state?: string
          event_id?: string
          last_recorded_at?: string
          previous_state?: string | null
          route_id?: string
          routing_plan_id?: string
          tenant_id?: string
        }
        Relationships: []
      }
      routing_delivery_transitions: {
        Row: {
          event_id: string
          metadata: Json | null
          previous_state: string | null
          recorded_at: string
          request_id: string
          route_id: string
          routing_plan_id: string
          state: string
          tenant_id: string
          trace_id: string
          tracking_id: string
        }
        Insert: {
          event_id: string
          metadata?: Json | null
          previous_state?: string | null
          recorded_at?: string
          request_id: string
          route_id: string
          routing_plan_id: string
          state: string
          tenant_id: string
          trace_id: string
          tracking_id?: string
        }
        Update: {
          event_id?: string
          metadata?: Json | null
          previous_state?: string | null
          recorded_at?: string
          request_id?: string
          route_id?: string
          routing_plan_id?: string
          state?: string
          tenant_id?: string
          trace_id?: string
          tracking_id?: string
        }
        Relationships: []
      }
      routing_health_alerts: {
        Row: {
          alert_id: string
          alert_type: string
          created_at: string
          metric_value: number
          stream_id: string
          tenant_id: string
          threshold: number
        }
        Insert: {
          alert_id?: string
          alert_type: string
          created_at?: string
          metric_value: number
          stream_id: string
          tenant_id: string
          threshold: number
        }
        Update: {
          alert_id?: string
          alert_type?: string
          created_at?: string
          metric_value?: number
          stream_id?: string
          tenant_id?: string
          threshold?: number
        }
        Relationships: []
      }
      routing_metrics_current: {
        Row: {
          avg_lag_ms: number
          computed_at: string
          dlq_rate: number
          enqueue_rate: number
          fairness_ratio: number
          retry_rate: number
          stream_id: string
          tenant_id: string
        }
        Insert: {
          avg_lag_ms?: number
          computed_at?: string
          dlq_rate?: number
          enqueue_rate?: number
          fairness_ratio?: number
          retry_rate?: number
          stream_id: string
          tenant_id: string
        }
        Update: {
          avg_lag_ms?: number
          computed_at?: string
          dlq_rate?: number
          enqueue_rate?: number
          fairness_ratio?: number
          retry_rate?: number
          stream_id?: string
          tenant_id?: string
        }
        Relationships: []
      }
      routing_metrics_minute: {
        Row: {
          dlq_count: number
          enqueue_count: number
          lag_sample_count: number
          minute_bucket: string
          received_count: number
          retry_count: number
          stream_id: string
          tenant_id: string
          total_lag_ms: number
        }
        Insert: {
          dlq_count?: number
          enqueue_count?: number
          lag_sample_count?: number
          minute_bucket: string
          received_count?: number
          retry_count?: number
          stream_id: string
          tenant_id: string
          total_lag_ms?: number
        }
        Update: {
          dlq_count?: number
          enqueue_count?: number
          lag_sample_count?: number
          minute_bucket?: string
          received_count?: number
          retry_count?: number
          stream_id?: string
          tenant_id?: string
          total_lag_ms?: number
        }
        Relationships: []
      }
      routing_plan_store: {
        Row: {
          created_at: string
          delivery_pattern: string
          event_id: string
          plan_payload: Json
          planned_at: string
          routing_plan_id: string
          routing_rule_version_id: string
          tenant_id: string
        }
        Insert: {
          created_at?: string
          delivery_pattern: string
          event_id: string
          plan_payload: Json
          planned_at?: string
          routing_plan_id: string
          routing_rule_version_id: string
          tenant_id: string
        }
        Update: {
          created_at?: string
          delivery_pattern?: string
          event_id?: string
          plan_payload?: Json
          planned_at?: string
          routing_plan_id?: string
          routing_rule_version_id?: string
          tenant_id?: string
        }
        Relationships: []
      }
      routing_routes: {
        Row: {
          condition_expression: Json
          route_id: string
          routing_rule_version_id: string
          target_stream: string
        }
        Insert: {
          condition_expression?: Json
          route_id?: string
          routing_rule_version_id: string
          target_stream: string
        }
        Update: {
          condition_expression?: Json
          route_id?: string
          routing_rule_version_id?: string
          target_stream?: string
        }
        Relationships: [
          {
            foreignKeyName: "routing_routes_rule_fkey"
            columns: ["routing_rule_version_id"]
            isOneToOne: false
            referencedRelation: "routing_rule_versions"
            referencedColumns: ["routing_rule_version_id"]
          },
        ]
      }
      routing_rule_versions: {
        Row: {
          activated_at: string | null
          created_at: string
          delivery_pattern: string
          event_type: string
          routing_rule_version_id: string
          status: string
          tenant_id: string
          version: string
        }
        Insert: {
          activated_at?: string | null
          created_at?: string
          delivery_pattern: string
          event_type: string
          routing_rule_version_id?: string
          status?: string
          tenant_id: string
          version: string
        }
        Update: {
          activated_at?: string | null
          created_at?: string
          delivery_pattern?: string
          event_type?: string
          routing_rule_version_id?: string
          status?: string
          tenant_id?: string
          version?: string
        }
        Relationships: []
      }
      sandbox_dispatch_logs: {
        Row: {
          body: string
          channel: string
          diagnostics: string | null
          latency_ms: number | null
          occurred_at: string
          provider_id: string
          provider_status_code: number | null
          recipient: string
          recorded_at: string
          request_id: string
          sandbox_log_id: string
          sandbox_mode: boolean
          simulated_delivery_id: string | null
          status: string
          subject: string | null
          tenant_id: string
          trace_id: string
        }
        Insert: {
          body: string
          channel: string
          diagnostics?: string | null
          latency_ms?: number | null
          occurred_at?: string
          provider_id: string
          provider_status_code?: number | null
          recipient: string
          recorded_at?: string
          request_id: string
          sandbox_log_id?: string
          sandbox_mode: boolean
          simulated_delivery_id?: string | null
          status: string
          subject?: string | null
          tenant_id: string
          trace_id: string
        }
        Update: {
          body?: string
          channel?: string
          diagnostics?: string | null
          latency_ms?: number | null
          occurred_at?: string
          provider_id?: string
          provider_status_code?: number | null
          recipient?: string
          recorded_at?: string
          request_id?: string
          sandbox_log_id?: string
          sandbox_mode?: boolean
          simulated_delivery_id?: string | null
          status?: string
          subject?: string | null
          tenant_id?: string
          trace_id?: string
        }
        Relationships: []
      }
      sandbox_notification_execution_logs: {
        Row: {
          channel: string
          execution_id: string
          latency_ms: number | null
          occurred_at: string
          provider_id: string
          provider_status: string | null
          recorded_at: string
          request_id: string
          simulated_delivery_id: string | null
          status: string
          template_code: string
          tenant_id: string
          trace_id: string
        }
        Insert: {
          channel: string
          execution_id?: string
          latency_ms?: number | null
          occurred_at?: string
          provider_id: string
          provider_status?: string | null
          recorded_at?: string
          request_id: string
          simulated_delivery_id?: string | null
          status: string
          template_code: string
          tenant_id: string
          trace_id: string
        }
        Update: {
          channel?: string
          execution_id?: string
          latency_ms?: number | null
          occurred_at?: string
          provider_id?: string
          provider_status?: string | null
          recorded_at?: string
          request_id?: string
          simulated_delivery_id?: string | null
          status?: string
          template_code?: string
          tenant_id?: string
          trace_id?: string
        }
        Relationships: []
      }
      scopes: {
        Row: {
          created_at: string | null
          display_name: string | null
          scope_id: string
          scope_type: string
          tenant_id: string
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          scope_id?: string
          scope_type: string
          tenant_id: string
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          scope_id?: string
          scope_type?: string
          tenant_id?: string
        }
        Relationships: []
      }
      service_register: {
        Row: {
          archived: boolean | null
          created_at: string | null
          created_by: string
          icon: string | null
          name: string
          tenant_id: string
          updated_at: string | null
          uuid: string
        }
        Insert: {
          archived?: boolean | null
          created_at?: string | null
          created_by: string
          icon?: string | null
          name: string
          tenant_id: string
          updated_at?: string | null
          uuid?: string
        }
        Update: {
          archived?: boolean | null
          created_at?: string | null
          created_by?: string
          icon?: string | null
          name?: string
          tenant_id?: string
          updated_at?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_register_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      session_issued_signals: {
        Row: {
          client_id: string
          client_type: string
          expires_at: string
          issued_at: string
          request_id: string
          session_id: string
          source_system: string
          tenant_id: string | null
          trace_id: string
          user_id: string
        }
        Insert: {
          client_id: string
          client_type: string
          expires_at: string
          issued_at: string
          request_id: string
          session_id: string
          source_system: string
          tenant_id?: string | null
          trace_id: string
          user_id: string
        }
        Update: {
          client_id?: string
          client_type?: string
          expires_at?: string
          issued_at?: string
          request_id?: string
          session_id?: string
          source_system?: string
          tenant_id?: string | null
          trace_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_issued_signals_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      signin_request_signals: {
        Row: {
          client_id: string
          credential_type: string
          identifier: string
          intent: string
          password_present: boolean | null
          received_at: string
          redirect: string | null
          request_id: string
          signal_id: string
          source_system: string
          tenant_id: string | null
          trace_id: string
        }
        Insert: {
          client_id: string
          credential_type: string
          identifier: string
          intent: string
          password_present?: boolean | null
          received_at?: string
          redirect?: string | null
          request_id: string
          signal_id?: string
          source_system: string
          tenant_id?: string | null
          trace_id: string
        }
        Update: {
          client_id?: string
          credential_type?: string
          identifier?: string
          intent?: string
          password_present?: boolean | null
          received_at?: string
          redirect?: string | null
          request_id?: string
          signal_id?: string
          source_system?: string
          tenant_id?: string | null
          trace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "signin_request_signals_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      snippet_register: {
        Row: {
          archived: boolean
          attachments: string[] | null
          call_url: string
          created_at: string
          created_by: string | null
          description: string
          name: string
          tenant_id: string
          updated_at: string
          uuid: string
        }
        Insert: {
          archived?: boolean
          attachments?: string[] | null
          call_url: string
          created_at?: string
          created_by?: string | null
          description: string
          name: string
          tenant_id: string
          updated_at?: string
          uuid?: string
        }
        Update: {
          archived?: boolean
          attachments?: string[] | null
          call_url?: string
          created_at?: string
          created_by?: string | null
          description?: string
          name?: string
          tenant_id?: string
          updated_at?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "snippet_register_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      stage_gate_attributes: {
        Row: {
          allowed_operators: Json
          attribute_id: string
          attribute_key: string
          created_at: string | null
          data_type: string
          display_name: string
          enum_values: Json | null
          is_active: boolean | null
          source_path: string
        }
        Insert: {
          allowed_operators: Json
          attribute_id?: string
          attribute_key: string
          created_at?: string | null
          data_type: string
          display_name: string
          enum_values?: Json | null
          is_active?: boolean | null
          source_path: string
        }
        Update: {
          allowed_operators?: Json
          attribute_id?: string
          attribute_key?: string
          created_at?: string | null
          data_type?: string
          display_name?: string
          enum_values?: Json | null
          is_active?: boolean | null
          source_path?: string
        }
        Relationships: []
      }
      stage_gate_condition_groups: {
        Row: {
          created_at: string | null
          gate_scope_id: string | null
          gate_version_id: string
          group_id: string
          logical_operator: string
        }
        Insert: {
          created_at?: string | null
          gate_scope_id?: string | null
          gate_version_id: string
          group_id?: string
          logical_operator: string
        }
        Update: {
          created_at?: string | null
          gate_scope_id?: string | null
          gate_version_id?: string
          group_id?: string
          logical_operator?: string
        }
        Relationships: [
          {
            foreignKeyName: "stage_gate_condition_groups_gate_scope_id_fkey"
            columns: ["gate_scope_id"]
            isOneToOne: false
            referencedRelation: "stage_gate_scopes"
            referencedColumns: ["gate_scope_id"]
          },
          {
            foreignKeyName: "stage_gate_condition_groups_gate_version_id_fkey"
            columns: ["gate_version_id"]
            isOneToOne: false
            referencedRelation: "stage_gate_versions"
            referencedColumns: ["gate_version_id"]
          },
        ]
      }
      stage_gate_evaluations: {
        Row: {
          context_snapshot: Json | null
          correlation_id: string | null
          created_at: string
          criteria_snapshot: Json | null
          evaluated_at: string
          evaluation_id: string
          evaluation_result: string
          gate_instance_id: string
          gate_template_id: string
          gate_version_id: string
          generated_obligations: Json | null
          policy_id: string | null
          risk_score: number | null
          tenant_id: string
          trace_id: string | null
          transaction_id: string | null
          workflow_id: string | null
          workflow_step: string | null
        }
        Insert: {
          context_snapshot?: Json | null
          correlation_id?: string | null
          created_at?: string
          criteria_snapshot?: Json | null
          evaluated_at?: string
          evaluation_id?: string
          evaluation_result: string
          gate_instance_id?: string
          gate_template_id: string
          gate_version_id: string
          generated_obligations?: Json | null
          policy_id?: string | null
          risk_score?: number | null
          tenant_id: string
          trace_id?: string | null
          transaction_id?: string | null
          workflow_id?: string | null
          workflow_step?: string | null
        }
        Update: {
          context_snapshot?: Json | null
          correlation_id?: string | null
          created_at?: string
          criteria_snapshot?: Json | null
          evaluated_at?: string
          evaluation_id?: string
          evaluation_result?: string
          gate_instance_id?: string
          gate_template_id?: string
          gate_version_id?: string
          generated_obligations?: Json | null
          policy_id?: string | null
          risk_score?: number | null
          tenant_id?: string
          trace_id?: string | null
          transaction_id?: string | null
          workflow_id?: string | null
          workflow_step?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_transaction"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["transaction_id"]
          },
          {
            foreignKeyName: "stage_gate_evaluations_gate_template_id_fkey"
            columns: ["gate_template_id"]
            isOneToOne: false
            referencedRelation: "stage_gate_templates"
            referencedColumns: ["gate_template_id"]
          },
          {
            foreignKeyName: "stage_gate_evaluations_gate_version_id_fkey"
            columns: ["gate_version_id"]
            isOneToOne: false
            referencedRelation: "stage_gate_versions"
            referencedColumns: ["gate_version_id"]
          },
          {
            foreignKeyName: "stage_gate_evaluations_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["policy_id"]
          },
          {
            foreignKeyName: "stage_gate_evaluations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "stage_gate_evaluations_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflow_type_registry"
            referencedColumns: ["workflow_type_id"]
          },
          {
            foreignKeyName: "stage_gate_evaluations_workflow_step_fkey"
            columns: ["workflow_step"]
            isOneToOne: false
            referencedRelation: "workflow_steps"
            referencedColumns: ["step_id"]
          },
        ]
      }
      stage_gate_obligations: {
        Row: {
          created_at: string | null
          obligation_id: string
          obligation_type: string
          outcome_id: string
          parameters: Json
        }
        Insert: {
          created_at?: string | null
          obligation_id?: string
          obligation_type: string
          outcome_id: string
          parameters: Json
        }
        Update: {
          created_at?: string | null
          obligation_id?: string
          obligation_type?: string
          outcome_id?: string
          parameters?: Json
        }
        Relationships: [
          {
            foreignKeyName: "stage_gate_obligations_outcome_id_fkey"
            columns: ["outcome_id"]
            isOneToOne: false
            referencedRelation: "stage_gate_rule_outcomes"
            referencedColumns: ["outcome_id"]
          },
        ]
      }
      stage_gate_rule_attributes: {
        Row: {
          allowed_operators: Json | null
          attribute_code: string
          attribute_id: string
          attribute_name: string
          created_at: string | null
          data_type: string
          description: string | null
          value: Json | null
        }
        Insert: {
          allowed_operators?: Json | null
          attribute_code: string
          attribute_id?: string
          attribute_name: string
          created_at?: string | null
          data_type: string
          description?: string | null
          value?: Json | null
        }
        Update: {
          allowed_operators?: Json | null
          attribute_code?: string
          attribute_id?: string
          attribute_name?: string
          created_at?: string | null
          data_type?: string
          description?: string | null
          value?: Json | null
        }
        Relationships: []
      }
      stage_gate_rule_conditions: {
        Row: {
          attribute: string
          condition_id: string
          created_at: string | null
          display_order: number
          operator: string
          rule_id: string
          value: Json
        }
        Insert: {
          attribute: string
          condition_id?: string
          created_at?: string | null
          display_order: number
          operator: string
          rule_id: string
          value: Json
        }
        Update: {
          attribute?: string
          condition_id?: string
          created_at?: string | null
          display_order?: number
          operator?: string
          rule_id?: string
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "stage_gate_rule_conditions_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "stage_gate_rules"
            referencedColumns: ["rule_id"]
          },
        ]
      }
      stage_gate_rule_outcomes: {
        Row: {
          created_at: string | null
          message: string | null
          outcome: string
          outcome_id: string
          primary_action: string
          rule_id: string
        }
        Insert: {
          created_at?: string | null
          message?: string | null
          outcome: string
          outcome_id?: string
          primary_action?: string
          rule_id: string
        }
        Update: {
          created_at?: string | null
          message?: string | null
          outcome?: string
          outcome_id?: string
          primary_action?: string
          rule_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stage_gate_rule_outcomes_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "stage_gate_rules"
            referencedColumns: ["rule_id"]
          },
        ]
      }
      stage_gate_rules: {
        Row: {
          created_at: string | null
          created_by: string
          gate_version_id: string
          priority: number
          rule_id: string
          rule_name: string | null
          status: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          gate_version_id: string
          priority?: number
          rule_id?: string
          rule_name?: string | null
          status?: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          gate_version_id?: string
          priority?: number
          rule_id?: string
          rule_name?: string | null
          status?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stage_gate_rules_gate_version_id_fkey"
            columns: ["gate_version_id"]
            isOneToOne: false
            referencedRelation: "stage_gate_versions"
            referencedColumns: ["gate_version_id"]
          },
          {
            foreignKeyName: "stage_gate_rules_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      stage_gate_scopes: {
        Row: {
          app_id: string
          created_at: string
          created_by: string
          gate_scope_id: string
          gate_template_id: string
          scope_type: string
        }
        Insert: {
          app_id: string
          created_at?: string
          created_by: string
          gate_scope_id?: string
          gate_template_id: string
          scope_type: string
        }
        Update: {
          app_id?: string
          created_at?: string
          created_by?: string
          gate_scope_id?: string
          gate_template_id?: string
          scope_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "stage_gate_scopes_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "applications_registry"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "stage_gate_scopes_gate_template_id_fkey"
            columns: ["gate_template_id"]
            isOneToOne: false
            referencedRelation: "stage_gate_templates"
            referencedColumns: ["gate_template_id"]
          },
        ]
      }
      stage_gate_templates: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          gate_name: string
          gate_template_id: string
          gate_type: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          gate_name: string
          gate_template_id?: string
          gate_type: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          gate_name?: string
          gate_template_id?: string
          gate_type?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stage_gate_templates_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      stage_gate_trigger_conditions: {
        Row: {
          attribute: string
          condition_id: string
          created_at: string | null
          display_order: number
          group_id: string
          operator: string
          value: Json
        }
        Insert: {
          attribute: string
          condition_id?: string
          created_at?: string | null
          display_order: number
          group_id: string
          operator: string
          value: Json
        }
        Update: {
          attribute?: string
          condition_id?: string
          created_at?: string | null
          display_order?: number
          group_id?: string
          operator?: string
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "stage_gate_trigger_conditions_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "stage_gate_condition_groups"
            referencedColumns: ["group_id"]
          },
        ]
      }
      stage_gate_versions: {
        Row: {
          created_at: string
          created_by: string
          effective_from: string | null
          gate_template_id: string
          gate_version_id: string
          lifecycle_reason: string | null
          published_at: string | null
          status: string
          updated_at: string
          version_label: string | null
          version_number: string
        }
        Insert: {
          created_at?: string
          created_by: string
          effective_from?: string | null
          gate_template_id: string
          gate_version_id?: string
          lifecycle_reason?: string | null
          published_at?: string | null
          status: string
          updated_at?: string
          version_label?: string | null
          version_number: string
        }
        Update: {
          created_at?: string
          created_by?: string
          effective_from?: string | null
          gate_template_id?: string
          gate_version_id?: string
          lifecycle_reason?: string | null
          published_at?: string | null
          status?: string
          updated_at?: string
          version_label?: string | null
          version_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "stage_gate_versions_gate_template_id_fkey"
            columns: ["gate_template_id"]
            isOneToOne: false
            referencedRelation: "stage_gate_templates"
            referencedColumns: ["gate_template_id"]
          },
        ]
      }
      stage_gate_workflow_types: {
        Row: {
          app_id: string
          gate_version_id: string
          uuid: string
          workflow_type: string
        }
        Insert: {
          app_id: string
          gate_version_id: string
          uuid?: string
          workflow_type: string
        }
        Update: {
          app_id?: string
          gate_version_id?: string
          uuid?: string
          workflow_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "stage_gate_workflow_types_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "applications_registry"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "stage_gate_workflow_types_gate_version_id_fkey"
            columns: ["gate_version_id"]
            isOneToOne: false
            referencedRelation: "stage_gate_versions"
            referencedColumns: ["gate_version_id"]
          },
          {
            foreignKeyName: "stage_gate_workflow_types_workflow_type_fkey"
            columns: ["workflow_type"]
            isOneToOne: false
            referencedRelation: "workflow_type_registry"
            referencedColumns: ["workflow_type_id"]
          },
        ]
      }
      stream_definitions: {
        Row: {
          allow_sub_keys: boolean | null
          created_at: string | null
          stream_key_field: string
          target_pyramid: string
          target_stream: string
        }
        Insert: {
          allow_sub_keys?: boolean | null
          created_at?: string | null
          stream_key_field: string
          target_pyramid: string
          target_stream: string
        }
        Update: {
          allow_sub_keys?: boolean | null
          created_at?: string | null
          stream_key_field?: string
          target_pyramid?: string
          target_stream?: string
        }
        Relationships: []
      }
      supabase_projects: {
        Row: {
          created_at: string | null
          created_by: string
          project_name: string
          project_url: string
          service_role: string
          status: string | null
          tenant_id: string | null
          uuid: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          project_name: string
          project_url: string
          service_role: string
          status?: string | null
          tenant_id?: string | null
          uuid?: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          project_name?: string
          project_url?: string
          service_role?: string
          status?: string | null
          tenant_id?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "supabase_projects_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      template_test_execution: {
        Row: {
          executed_at: string | null
          executed_by: string | null
          locale: string
          missing_variables: Json | null
          provider_validation_status: string | null
          rendered_html: string | null
          rendered_subject: string | null
          rendered_text: string | null
          sandbox_recipient: string | null
          template_key: string
          tenant_id: string
          test_id: string
          trace_id: string | null
        }
        Insert: {
          executed_at?: string | null
          executed_by?: string | null
          locale: string
          missing_variables?: Json | null
          provider_validation_status?: string | null
          rendered_html?: string | null
          rendered_subject?: string | null
          rendered_text?: string | null
          sandbox_recipient?: string | null
          template_key: string
          tenant_id: string
          test_id?: string
          trace_id?: string | null
        }
        Update: {
          executed_at?: string | null
          executed_by?: string | null
          locale?: string
          missing_variables?: Json | null
          provider_validation_status?: string | null
          rendered_html?: string | null
          rendered_subject?: string | null
          rendered_text?: string | null
          sandbox_recipient?: string | null
          template_key?: string
          tenant_id?: string
          test_id?: string
          trace_id?: string | null
        }
        Relationships: []
      }
      template_variable_schema: {
        Row: {
          required: boolean | null
          template_key: string
          tenant_id: string
          variable_name: string
          variable_type: string
        }
        Insert: {
          required?: boolean | null
          template_key: string
          tenant_id: string
          variable_name: string
          variable_type: string
        }
        Update: {
          required?: boolean | null
          template_key?: string
          tenant_id?: string
          variable_name?: string
          variable_type?: string
        }
        Relationships: []
      }
      tenant_configuration_overrides: {
        Row: {
          created_at: string
          created_by: string
          inherits_global: boolean | null
          override_id: string
          published_at: string | null
          schema_id: string
          status: string
          tenant_id: string
          updated_at: string
          value: Json
          version: string
        }
        Insert: {
          created_at?: string
          created_by: string
          inherits_global?: boolean | null
          override_id?: string
          published_at?: string | null
          schema_id: string
          status: string
          tenant_id: string
          updated_at?: string
          value: Json
          version: string
        }
        Update: {
          created_at?: string
          created_by?: string
          inherits_global?: boolean | null
          override_id?: string
          published_at?: string | null
          schema_id?: string
          status?: string
          tenant_id?: string
          updated_at?: string
          value?: Json
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_configuration_overrides_schema_id_fkey"
            columns: ["schema_id"]
            isOneToOne: false
            referencedRelation: "configuration_schemas"
            referencedColumns: ["schema_id"]
          },
          {
            foreignKeyName: "tenant_configuration_overrides_tenant_id_fkey1"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number | null
          authorization_status: string | null
          created_at: string | null
          currency: string | null
          initiator_id: string
          tenant_id: string
          transaction_id: string
          transaction_timestamp: string | null
          transaction_type: string
        }
        Insert: {
          amount?: number | null
          authorization_status?: string | null
          created_at?: string | null
          currency?: string | null
          initiator_id: string
          tenant_id: string
          transaction_id?: string
          transaction_timestamp?: string | null
          transaction_type: string
        }
        Update: {
          amount?: number | null
          authorization_status?: string | null
          created_at?: string | null
          currency?: string | null
          initiator_id?: string
          tenant_id?: string
          transaction_id?: string
          transaction_timestamp?: string | null
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      trusted_producers: {
        Row: {
          created_at: string
          producer_id: string
          source_system: string
          status: string
        }
        Insert: {
          created_at?: string
          producer_id: string
          source_system: string
          status: string
        }
        Update: {
          created_at?: string
          producer_id?: string
          source_system?: string
          status?: string
        }
        Relationships: []
      }
      usage_alerts: {
        Row: {
          alert_id: string
          app_id: string
          current_usage: number | null
          enforcement_action: string | null
          enforcement_state: string | null
          evaluated_at: string | null
          evaluation_result: string | null
          feature: string | null
          new_state: string | null
          previous_state: string | null
          quota_limit: number | null
          request_payload: Json | null
          response_payload: Json | null
          tenant_id: string
          utilization_percent: number | null
        }
        Insert: {
          alert_id?: string
          app_id: string
          current_usage?: number | null
          enforcement_action?: string | null
          enforcement_state?: string | null
          evaluated_at?: string | null
          evaluation_result?: string | null
          feature?: string | null
          new_state?: string | null
          previous_state?: string | null
          quota_limit?: number | null
          request_payload?: Json | null
          response_payload?: Json | null
          tenant_id: string
          utilization_percent?: number | null
        }
        Update: {
          alert_id?: string
          app_id?: string
          current_usage?: number | null
          enforcement_action?: string | null
          enforcement_state?: string | null
          evaluated_at?: string | null
          evaluation_result?: string | null
          feature?: string | null
          new_state?: string | null
          previous_state?: string | null
          quota_limit?: number | null
          request_payload?: Json | null
          response_payload?: Json | null
          tenant_id?: string
          utilization_percent?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_alerts_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "applications_registry"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "usage_alerts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      usage_daily: {
        Row: {
          client_app_id: string
          created_at: string | null
          event_subtype: string
          event_type: string
          feature_category: string
          id: string
          platform_app_id: string
          tenant_id: string
          total_requests: number
          updated_at: string | null
          usage_date: string
        }
        Insert: {
          client_app_id: string
          created_at?: string | null
          event_subtype?: string
          event_type: string
          feature_category?: string
          id?: string
          platform_app_id: string
          tenant_id: string
          total_requests?: number
          updated_at?: string | null
          usage_date: string
        }
        Update: {
          client_app_id?: string
          created_at?: string | null
          event_subtype?: string
          event_type?: string
          feature_category?: string
          id?: string
          platform_app_id?: string
          tenant_id?: string
          total_requests?: number
          updated_at?: string | null
          usage_date?: string
        }
        Relationships: []
      }
      usage_events: {
        Row: {
          attribution_status: string | null
          client_app_id: string
          correlation_id: string | null
          created_at: string | null
          event_id: string
          event_subtype: string | null
          event_type: string
          failure_reason: string | null
          feature_category: string | null
          idempotency_key: string | null
          metadata: Json | null
          payload_size_bytes: number | null
          platform_app_id: string
          processed_at: string | null
          processing_latency_ms: number | null
          processing_status: string | null
          request_count: number | null
          retry_count: number | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          attribution_status?: string | null
          client_app_id: string
          correlation_id?: string | null
          created_at?: string | null
          event_id?: string
          event_subtype?: string | null
          event_type: string
          failure_reason?: string | null
          feature_category?: string | null
          idempotency_key?: string | null
          metadata?: Json | null
          payload_size_bytes?: number | null
          platform_app_id: string
          processed_at?: string | null
          processing_latency_ms?: number | null
          processing_status?: string | null
          request_count?: number | null
          retry_count?: number | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          attribution_status?: string | null
          client_app_id?: string
          correlation_id?: string | null
          created_at?: string | null
          event_id?: string
          event_subtype?: string | null
          event_type?: string
          failure_reason?: string | null
          feature_category?: string | null
          idempotency_key?: string | null
          metadata?: Json | null
          payload_size_bytes?: number | null
          platform_app_id?: string
          processed_at?: string | null
          processing_latency_ms?: number | null
          processing_status?: string | null
          request_count?: number | null
          retry_count?: number | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_events_client_app_id_fkey"
            columns: ["client_app_id"]
            isOneToOne: false
            referencedRelation: "applications_registry"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "usage_events_platform_app_id_fkey"
            columns: ["platform_app_id"]
            isOneToOne: false
            referencedRelation: "app_registry"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "usage_events_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      usage_monthly: {
        Row: {
          client_app_id: string
          created_at: string | null
          event_subtype: string
          event_type: string
          feature_category: string
          id: string
          platform_app_id: string
          tenant_id: string
          total_requests: number
          updated_at: string | null
          usage_month: string
        }
        Insert: {
          client_app_id: string
          created_at?: string | null
          event_subtype?: string
          event_type: string
          feature_category?: string
          id?: string
          platform_app_id: string
          tenant_id: string
          total_requests?: number
          updated_at?: string | null
          usage_month: string
        }
        Update: {
          client_app_id?: string
          created_at?: string | null
          event_subtype?: string
          event_type?: string
          feature_category?: string
          id?: string
          platform_app_id?: string
          tenant_id?: string
          total_requests?: number
          updated_at?: string | null
          usage_month?: string
        }
        Relationships: []
      }
      usage_snapshots: {
        Row: {
          calculated_at: string | null
          client_app_id: string
          platform_app_id: string
          quota_limit: number | null
          remaining_quota: number | null
          snapshot_id: string
          tenant_id: string
          total_usage: number | null
          utilization_percent: number | null
        }
        Insert: {
          calculated_at?: string | null
          client_app_id: string
          platform_app_id: string
          quota_limit?: number | null
          remaining_quota?: number | null
          snapshot_id?: string
          tenant_id: string
          total_usage?: number | null
          utilization_percent?: number | null
        }
        Update: {
          calculated_at?: string | null
          client_app_id?: string
          platform_app_id?: string
          quota_limit?: number | null
          remaining_quota?: number | null
          snapshot_id?: string
          tenant_id?: string
          total_usage?: number | null
          utilization_percent?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_snapshots_client_app_id_fkey"
            columns: ["client_app_id"]
            isOneToOne: false
            referencedRelation: "applications_registry"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "usage_snapshots_platform_app_id_fkey"
            columns: ["platform_app_id"]
            isOneToOne: false
            referencedRelation: "app_registry"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "usage_snapshots_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      user_application_roles: {
        Row: {
          application_id: string
          assigned_at: string | null
          role_id: string
          tenant_id: string
          user_id: string
          uuid: string
        }
        Insert: {
          application_id: string
          assigned_at?: string | null
          role_id: string
          tenant_id: string
          user_id?: string
          uuid?: string
        }
        Update: {
          application_id?: string
          assigned_at?: string | null
          role_id?: string
          tenant_id?: string
          user_id?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_application_roles_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications_registry"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "user_application_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "application_roles"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "user_application_roles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      user_identity: {
        Row: {
          auth_flags: Json
          identity_state: string
          updated_at: string
          user_id: string
        }
        Insert: {
          auth_flags?: Json
          identity_state: string
          updated_at?: string
          user_id: string
        }
        Update: {
          auth_flags?: Json
          identity_state?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_identity_state_log: {
        Row: {
          created_at: string
          id: string
          new_state: string
          previous_state: string
          reason_code: string | null
          request_id: string
          source_system: string
          trace_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          new_state: string
          previous_state: string
          reason_code?: string | null
          request_id: string
          source_system: string
          trace_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          new_state?: string
          previous_state?: string
          reason_code?: string | null
          request_id?: string
          source_system?: string
          trace_id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          auth_methods: string[]
          created_at: string
          email: string
          email_verified: boolean
          status: string
          tenant_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          auth_methods?: string[]
          created_at?: string
          email: string
          email_verified?: boolean
          status: string
          tenant_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          auth_methods?: string[]
          created_at?: string
          email?: string
          email_verified?: boolean
          status?: string
          tenant_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      verification_client_allowlist: {
        Row: {
          allowed_origins: string[]
          client_id: string
          client_type: string
          enabled: boolean
        }
        Insert: {
          allowed_origins: string[]
          client_id: string
          client_type: string
          enabled?: boolean
        }
        Update: {
          allowed_origins?: string[]
          client_id?: string
          client_type?: string
          enabled?: boolean
        }
        Relationships: []
      }
      verification_client_validation_signals: {
        Row: {
          client_id: string
          id: string
          reason_code: string
          request_id: string
          source_system: string
          tenant_id: string | null
          trace_id: string
          valid: boolean
          validated_at: string
        }
        Insert: {
          client_id: string
          id?: string
          reason_code: string
          request_id: string
          source_system: string
          tenant_id?: string | null
          trace_id: string
          valid: boolean
          validated_at?: string
        }
        Update: {
          client_id?: string
          id?: string
          reason_code?: string
          request_id?: string
          source_system?: string
          tenant_id?: string | null
          trace_id?: string
          valid?: boolean
          validated_at?: string
        }
        Relationships: []
      }
      verification_email_delivery_logs: {
        Row: {
          attempt: number
          failure_reason: string | null
          log_id: string
          occurred_at: string
          provider: string
          provider_message_id: string | null
          recipient: string
          recorded_at: string
          request_id: string
          sandbox_mode: boolean
          source_system: string
          status: string
          template_key: string
          tenant_id: string | null
          trace_id: string
          verification_type: string
        }
        Insert: {
          attempt: number
          failure_reason?: string | null
          log_id?: string
          occurred_at: string
          provider: string
          provider_message_id?: string | null
          recipient: string
          recorded_at?: string
          request_id: string
          sandbox_mode?: boolean
          source_system: string
          status: string
          template_key: string
          tenant_id?: string | null
          trace_id: string
          verification_type: string
        }
        Update: {
          attempt?: number
          failure_reason?: string | null
          log_id?: string
          occurred_at?: string
          provider?: string
          provider_message_id?: string | null
          recipient?: string
          recorded_at?: string
          request_id?: string
          sandbox_mode?: boolean
          source_system?: string
          status?: string
          template_key?: string
          tenant_id?: string | null
          trace_id?: string
          verification_type?: string
        }
        Relationships: []
      }
      verification_enforcement_signals: {
        Row: {
          action: string
          enforced_at: string
          id: string
          intent: string
          reason_code: string
          request_id: string
          source_system: string
          status: string
          tenant_id: string | null
          trace_id: string
        }
        Insert: {
          action: string
          enforced_at: string
          id?: string
          intent: string
          reason_code: string
          request_id: string
          source_system: string
          status: string
          tenant_id?: string | null
          trace_id: string
        }
        Update: {
          action?: string
          enforced_at?: string
          id?: string
          intent?: string
          reason_code?: string
          request_id?: string
          source_system?: string
          status?: string
          tenant_id?: string | null
          trace_id?: string
        }
        Relationships: []
      }
      verification_intent_events: {
        Row: {
          id: string
          intent: string
          received_at: string
          redirect: string | null
          request_id: string
          source_system: string
          tenant_id: string | null
          token: string
          trace_id: string
        }
        Insert: {
          id?: string
          intent: string
          received_at?: string
          redirect?: string | null
          request_id: string
          source_system: string
          tenant_id?: string | null
          token: string
          trace_id: string
        }
        Update: {
          id?: string
          intent?: string
          received_at?: string
          redirect?: string | null
          request_id?: string
          source_system?: string
          tenant_id?: string | null
          token?: string
          trace_id?: string
        }
        Relationships: []
      }
      verification_outcome_signals: {
        Row: {
          id: string
          intent: string
          mapped_at: string
          mapped_reason_code: string
          mapped_status: string
          raw_reason_code: string
          raw_status: string
          request_id: string
          source_system: string
          tenant_id: string | null
          trace_id: string
        }
        Insert: {
          id?: string
          intent: string
          mapped_at: string
          mapped_reason_code: string
          mapped_status: string
          raw_reason_code: string
          raw_status: string
          request_id: string
          source_system: string
          tenant_id?: string | null
          trace_id: string
        }
        Update: {
          id?: string
          intent?: string
          mapped_at?: string
          mapped_reason_code?: string
          mapped_status?: string
          raw_reason_code?: string
          raw_status?: string
          request_id?: string
          source_system?: string
          tenant_id?: string | null
          trace_id?: string
        }
        Relationships: []
      }
      wallet_lifecycle_history: {
        Row: {
          effective_date: string
          lifecycle_record_id: string
          new_status: string | null
          performed_by: string | null
          previous_status: string | null
          reason: string | null
          updated_at: string | null
          wallet_id: string | null
        }
        Insert: {
          effective_date: string
          lifecycle_record_id?: string
          new_status?: string | null
          performed_by?: string | null
          previous_status?: string | null
          reason?: string | null
          updated_at?: string | null
          wallet_id?: string | null
        }
        Update: {
          effective_date?: string
          lifecycle_record_id?: string
          new_status?: string | null
          performed_by?: string | null
          previous_status?: string | null
          reason?: string | null
          updated_at?: string | null
          wallet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wallet_lifecycle_history_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["wallet_id"]
          },
        ]
      }
      wallet_metadata: {
        Row: {
          created_at: string | null
          created_by: string
          currency_or_asset_type: string
          metadata_id: string
          regulatory_classification: string
          risk_level: string
          tags: Json | null
          updated_at: string | null
          wallet_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          currency_or_asset_type: string
          metadata_id?: string
          regulatory_classification: string
          risk_level: string
          tags?: Json | null
          updated_at?: string | null
          wallet_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          currency_or_asset_type?: string
          metadata_id?: string
          regulatory_classification?: string
          risk_level?: string
          tags?: Json | null
          updated_at?: string | null
          wallet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wallet_metadata_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["wallet_id"]
          },
        ]
      }
      wallet_ownership: {
        Row: {
          association_type: string
          created_at: string | null
          created_by: string
          effective_from: string | null
          effective_until: string | null
          owner_type: string
          ownership_id: string
          updated_at: string | null
          user_id: string
          wallet_id: string | null
        }
        Insert: {
          association_type: string
          created_at?: string | null
          created_by: string
          effective_from?: string | null
          effective_until?: string | null
          owner_type: string
          ownership_id?: string
          updated_at?: string | null
          user_id: string
          wallet_id?: string | null
        }
        Update: {
          association_type?: string
          created_at?: string | null
          created_by?: string
          effective_from?: string | null
          effective_until?: string | null
          owner_type?: string
          ownership_id?: string
          updated_at?: string | null
          user_id?: string
          wallet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wallet_ownership_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["wallet_id"]
          },
        ]
      }
      wallets: {
        Row: {
          created_at: string | null
          created_by: string
          description: string
          owner_id: string
          owner_type: string
          status: string
          tenant_id: string | null
          updated_at: string | null
          wallet_id: string
          wallet_name: string
          wallet_type: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description: string
          owner_id: string
          owner_type: string
          status?: string
          tenant_id?: string | null
          updated_at?: string | null
          wallet_id?: string
          wallet_name: string
          wallet_type: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string
          owner_id?: string
          owner_type?: string
          status?: string
          tenant_id?: string | null
          updated_at?: string | null
          wallet_id?: string
          wallet_name?: string
          wallet_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallets_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      workflow_health_metrics: {
        Row: {
          captured_at: string
          completed_at: string | null
          duration_ms: number | null
          error_message: string | null
          metadata: Json | null
          metric_id: string
          started_at: string | null
          status: string
          step_failed: string | null
          tenant_id: string
          workflow_id: string
          workflow_name: string
          workflow_version: string | null
        }
        Insert: {
          captured_at?: string
          completed_at?: string | null
          duration_ms?: number | null
          error_message?: string | null
          metadata?: Json | null
          metric_id?: string
          started_at?: string | null
          status: string
          step_failed?: string | null
          tenant_id: string
          workflow_id: string
          workflow_name: string
          workflow_version?: string | null
        }
        Update: {
          captured_at?: string
          completed_at?: string | null
          duration_ms?: number | null
          error_message?: string | null
          metadata?: Json | null
          metric_id?: string
          started_at?: string | null
          status?: string
          step_failed?: string | null
          tenant_id?: string
          workflow_id?: string
          workflow_name?: string
          workflow_version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workflow_health_metrics_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      workflow_step_inputs: {
        Row: {
          created_at: string | null
          data_type: string
          default_value: string | null
          input_key: string
          input_name: string
          is_required: boolean
          source: string
          step_id: string
          step_input_id: string
          updated_at: string | null
          workflow_type_id: string
        }
        Insert: {
          created_at?: string | null
          data_type: string
          default_value?: string | null
          input_key: string
          input_name: string
          is_required?: boolean
          source: string
          step_id: string
          step_input_id?: string
          updated_at?: string | null
          workflow_type_id: string
        }
        Update: {
          created_at?: string | null
          data_type?: string
          default_value?: string | null
          input_key?: string
          input_name?: string
          is_required?: boolean
          source?: string
          step_id?: string
          step_input_id?: string
          updated_at?: string | null
          workflow_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_step_inputs_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "workflow_steps"
            referencedColumns: ["step_id"]
          },
          {
            foreignKeyName: "workflow_step_inputs_workflow_type_id_fkey"
            columns: ["workflow_type_id"]
            isOneToOne: false
            referencedRelation: "workflow_type_registry"
            referencedColumns: ["workflow_type_id"]
          },
        ]
      }
      workflow_step_outputs: {
        Row: {
          consumed_by_step_id: Json | null
          created_at: string | null
          data_type: string
          is_available_to_next_step: boolean
          output_key: string
          output_label: string
          step_id: string
          step_output_id: string
          updated_at: string | null
          workflow_type_id: string
        }
        Insert: {
          consumed_by_step_id?: Json | null
          created_at?: string | null
          data_type: string
          is_available_to_next_step?: boolean
          output_key: string
          output_label: string
          step_id: string
          step_output_id?: string
          updated_at?: string | null
          workflow_type_id: string
        }
        Update: {
          consumed_by_step_id?: Json | null
          created_at?: string | null
          data_type?: string
          is_available_to_next_step?: boolean
          output_key?: string
          output_label?: string
          step_id?: string
          step_output_id?: string
          updated_at?: string | null
          workflow_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_step_outputs_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "workflow_steps"
            referencedColumns: ["step_id"]
          },
          {
            foreignKeyName: "workflow_step_outputs_workflow_type_id_fkey"
            columns: ["workflow_type_id"]
            isOneToOne: false
            referencedRelation: "workflow_type_registry"
            referencedColumns: ["workflow_type_id"]
          },
        ]
      }
      workflow_steps: {
        Row: {
          can_be_skipped: boolean
          created_at: string | null
          created_by: string
          gate_check_position: string | null
          is_mandatory: boolean
          max_retry_attempts: number | null
          on_failure: string
          requires_gate_check: boolean
          status: string
          step_description: string | null
          step_id: string
          step_name: string
          step_order: number
          step_type: string
          timeout_minutes: number | null
          updated_at: string | null
          workflow_type_id: string
        }
        Insert: {
          can_be_skipped?: boolean
          created_at?: string | null
          created_by?: string
          gate_check_position?: string | null
          is_mandatory?: boolean
          max_retry_attempts?: number | null
          on_failure: string
          requires_gate_check?: boolean
          status: string
          step_description?: string | null
          step_id?: string
          step_name: string
          step_order: number
          step_type: string
          timeout_minutes?: number | null
          updated_at?: string | null
          workflow_type_id: string
        }
        Update: {
          can_be_skipped?: boolean
          created_at?: string | null
          created_by?: string
          gate_check_position?: string | null
          is_mandatory?: boolean
          max_retry_attempts?: number | null
          on_failure?: string
          requires_gate_check?: boolean
          status?: string
          step_description?: string | null
          step_id?: string
          step_name?: string
          step_order?: number
          step_type?: string
          timeout_minutes?: number | null
          updated_at?: string | null
          workflow_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_steps_workflow_type_id_fkey"
            columns: ["workflow_type_id"]
            isOneToOne: false
            referencedRelation: "workflow_type_registry"
            referencedColumns: ["workflow_type_id"]
          },
        ]
      }
      workflow_type_registry: {
        Row: {
          app_id: string
          created_at: string | null
          created_by: string | null
          description: string | null
          requires_gate_evaluation: boolean
          risk_level: string
          status: string
          tenant_id: string
          updated_at: string | null
          workflow_name: string
          workflow_type_id: string
        }
        Insert: {
          app_id: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          requires_gate_evaluation?: boolean
          risk_level: string
          status?: string
          tenant_id: string
          updated_at?: string | null
          workflow_name: string
          workflow_type_id?: string
        }
        Update: {
          app_id?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          requires_gate_evaluation?: boolean
          risk_level?: string
          status?: string
          tenant_id?: string
          updated_at?: string | null
          workflow_name?: string
          workflow_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_types_app_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "applications_registry"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "workflow_types_tenant_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["uuid"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      aggregate_usage_daily: { Args: never; Returns: number }
      aggregate_usage_monthly: { Args: never; Returns: number }
      append_only_audit_write: { Args: { input_payload: Json }; Returns: Json }
      audit_event_intake: { Args: { input_payload: Json }; Returns: Json }
      auth_signup_service: { Args: { input_payload: Json }; Returns: Json }
      authorize_member: { Args: { input_payload: Json }; Returns: Json }
      base64url_decode: { Args: { p_input: string }; Returns: string }
      base64url_encode: { Args: { p_input: string }; Returns: string }
      build_pdp_attributes: {
        Args: {
          p_auth_context: Json
          p_request_context: Json
          p_request_id: string
          p_source_system: string
          p_trace_id: string
        }
        Returns: Json
      }
      build_routing_plan: {
        Args: { p_headers: Json; p_routing_plan_request: Json }
        Returns: Json
      }
      build_verification_link: { Args: { input_payload: Json }; Returns: Json }
      check_org_uniqueness: { Args: { input_payload: Json }; Returns: Json }
      check_route_idempotency: {
        Args: { p_headers: Json; p_route_idempotency_check_request: Json }
        Returns: Json
      }
      check_user_consent: {
        Args: { p_app_id: string; p_tenant_id: string; p_user_id: string }
        Returns: {
          consent_status: string
          document_id: string
          document_version_id: string
        }[]
      }
      complete_verification_response: {
        Args: { input_payload: Json }
        Returns: Json
      }
      compose_email_payload: { Args: { input_payload: Json }; Returns: Json }
      create_organization: { Args: { input_payload: Json }; Returns: Json }
      create_organization_member: {
        Args: {
          p_email: string
          p_full_name?: string
          p_tenant_id: string
          p_user_id?: string
        }
        Returns: Json
      }
      dispatch_external: {
        Args: { p_headers: Json; p_payload: Json; p_provider_context: Json }
        Returns: Json
      }
      dispatch_notification: { Args: { input_payload: Json }; Returns: Json }
      email_template_resolver: { Args: { input_payload: Json }; Returns: Json }
      emit_routing_health_signal: {
        Args: { p_headers: Json; p_health_signal: Json }
        Returns: Json
      }
      enforce_verification_outcome: {
        Args: { input_payload: Json }
        Returns: Json
      }
      evaluate_role_policy: {
        Args: {
          p_caller_context: Json
          p_policy_bundle: Json
          p_resource: Json
        }
        Returns: Json
      }
      evaluate_route_retry: {
        Args: { p_headers: Json; p_retry_request: Json }
        Returns: Json
      }
      execute_ddl: { Args: { sql: string }; Returns: undefined }
      execute_sandbox_notification_delivery: {
        Args: {
          p_channel: string
          p_provider_id: string
          p_recipient: string
          p_request_id: string
          p_sandbox_mode: boolean
          p_template_code: string
          p_tenant_id: string
          p_trace_id: string
          p_variables: Json
        }
        Returns: Json
      }
      extract_partition_keys: {
        Args: { p_headers: Json; p_partition_key_request: Json }
        Returns: Json
      }
      forward_request: {
        Args: {
          p_method: string
          p_path: string
          p_policy_decision: string
          p_request_id: string
          p_source_system: string
          p_trace_id: string
        }
        Returns: Json
      }
      generate_export_job_code: { Args: never; Returns: string }
      generate_trace_context: { Args: { headers?: Json }; Returns: Json }
      get_member_by_id: { Args: { p_member_id: string }; Returns: Json }
      get_organization_name_by_id: {
        Args: { p_org_id: string }
        Returns: string
      }
      get_policy_bundle: {
        Args: { p_action: string; p_resource_type: string; p_tenant_id: string }
        Returns: Json
      }
      get_user_identity_panel: {
        Args: { p_tenant_id: string; p_user_id: string }
        Returns: Json
      }
      get_user_organization_id: { Args: never; Returns: string }
      get_users_list: {
        Args: { p_tenant_id: string }
        Returns: {
          email: string
          full_name: string
          last_login: string
          mobile_number: string
          role: string
          status: string
          user_id: string
        }[]
      }
      get_vault_secret: { Args: { secret_name: string }; Returns: string }
      intake_signin: { Args: { input_payload: Json }; Returns: Json }
      intercept_request: {
        Args: { p_headers: Json; p_http_method: string; p_request_path: string }
        Returns: Json
      }
      interpret_obligations: {
        Args: {
          p_enforcement_instructions: Json
          p_request_id: string
          p_source_system: string
          p_trace_id: string
        }
        Returns: Json
      }
      invite_organization_member:
        | {
            Args: {
              p_business_unit: string
              p_designation: string
              p_email: string
              p_full_name: string
              p_mobile_number: string
              p_reporting_manager: string
              p_tenant_id?: string
            }
            Returns: Json
          }
        | {
            Args: {
              p_business_unit: string
              p_designation: string
              p_email: string
              p_full_name: string
              p_mobile_number: string
              p_reporting_manager: string
            }
            Returns: Json
          }
        | {
            Args: {
              p_business_unit: string
              p_business_unit_id?: string
              p_designation: string
              p_email: string
              p_full_name: string
              p_mobile_number: string
              p_reporting_manager: string
              p_tenant_id?: string
            }
            Returns: Json
          }
      issue_session: { Args: { input_payload: Json }; Returns: Json }
      issue_verification_token: { Args: { input_payload: Json }; Returns: Json }
      json_matches_schema: {
        Args: { instance: Json; schema: Json }
        Returns: boolean
      }
      jsonb_matches_schema: {
        Args: { instance: Json; schema: Json }
        Returns: boolean
      }
      jsonschema_is_valid: { Args: { schema: Json }; Returns: boolean }
      jsonschema_validation_errors: {
        Args: { instance: Json; schema: Json }
        Returns: string[]
      }
      kms_issue_lease: {
        Args: {
          p_column: string
          p_purpose: string
          p_schema: string
          p_table: string
          p_tenant_id: string
        }
        Returns: Json
      }
      lookup_member: { Args: { input_payload: Json }; Returns: Json }
      lookup_runtime_registry: {
        Args: { p_headers: Json; p_registry_lookup_request: Json }
        Returns: Json
      }
      map_verification_outcome: { Args: { input_payload: Json }; Returns: Json }
      next_app_sequence: { Args: { p_tenant_id: string }; Returns: number }
      normalize_input_service: { Args: { input_payload: Json }; Returns: Json }
      policy_decision_point: { Args: { input_payload: Json }; Returns: Json }
      project_pending_signup_state: {
        Args: { input_payload: Json }
        Returns: Json
      }
      query_delivery_logs: {
        Args: {
          p_channel?: string
          p_delivery_id?: string
          p_event_id?: string
          p_from_timestamp?: string
          p_page?: number
          p_page_size?: number
          p_provider?: string
          p_recipient?: string
          p_tenant_id: string
          p_to_timestamp?: string
        }
        Returns: Json
      }
      read_profile: { Args: { input_payload: Json }; Returns: Json }
      record_decision: { Args: { input_payload: Json }; Returns: Json }
      redirect_validate: { Args: { input_payload: Json }; Returns: Json }
      register_event_type: {
        Args: {
          p_event_type: string
          p_headers_required: string[]
          p_partition_keys?: string[]
          p_schema_version: number
        }
        Returns: Json
      }
      registry_writer: {
        Args: { p_acl?: Json; p_event_definition: Json; p_event_version: Json }
        Returns: Json
      }
      resolve_caller_context: {
        Args: { p_session_id?: string; p_token?: string }
        Returns: Json
      }
      resolve_onboarding_state: { Args: { input_payload: Json }; Returns: Json }
      resolve_policy_set: {
        Args: { p_action: string; p_resource_type: string; p_tenant_id: string }
        Returns: Json
      }
      resolve_routing_rules: {
        Args: { p_headers: Json; p_routing_resolve_request: Json }
        Returns: Json
      }
      retrieve_active_email_template: {
        Args: { p_locale?: string; p_template_key: string }
        Returns: Json
      }
      route_event: {
        Args: { p_event_type: string; p_headers: Json; p_payload: Json }
        Returns: Json
      }
      route_event_intake: {
        Args: { p_headers: Json; p_payload: Json; p_routing_keys: Json }
        Returns: Json
      }
      route_to_dlq_or_quarantine: {
        Args: { p_dlq_request: Json; p_headers: Json }
        Returns: Json
      }
      safe_uuid: { Args: { p_text: string }; Returns: string }
      sandbox_dispatch_message: {
        Args: {
          p_body: string
          p_channel: string
          p_provider_id: string
          p_recipient: string
          p_request_id: string
          p_sandbox_mode: boolean
          p_subject: string
          p_tenant_id: string
          p_trace_id: string
        }
        Returns: Json
      }
      seal_audit_batch: {
        Args: {
          p_batch_id: string
          p_previous_seal_hash: string
          p_request_id: string
          p_seal_hash: string
          p_signature: string
          p_source_system: string
          p_tenant_id: string
          p_trace_id: string
        }
        Returns: Json
      }
      sign: {
        Args: { p_alg: string; p_payload: Json; p_secret: string }
        Returns: string
      }
      submit_change_event: { Args: { p_payload: Json }; Returns: Json }
      track_routing_delivery: {
        Args: { p_delivery_track_request: Json; p_headers: Json }
        Returns: Json
      }
      transition_registry_status: {
        Args: { p_event_version_id: string; p_target_status: string }
        Returns: Json
      }
      user_identity_state: {
        Args: { p_headers: Json; p_identity: Json }
        Returns: Json
      }
      validate_and_hash_password: {
        Args: { input_payload: Json }
        Returns: Json
      }
      validate_auth_context: {
        Args: {
          p_header_tenant_id: string
          p_scopes: string[]
          p_subject_id: string
          p_token_id: string
          p_token_tenant_id: string
        }
        Returns: Json
      }
      validate_event_definition: {
        Args: {
          p_event_type: string
          p_partition_key_field: string
          p_schema: Json
          p_schema_version: string
        }
        Returns: Json
      }
      validate_event_emission: {
        Args: {
          p_event_type: string
          p_headers: Json
          p_payload: Json
          p_schema_version: number
        }
        Returns: Json
      }
      validate_org: { Args: { input_payload: Json }; Returns: Json }
      validate_registry_transition: {
        Args: {
          p_current_status: string
          p_event_version_id: string
          p_target_status: string
        }
        Returns: Json
      }
      validate_required_fields: { Args: { input_payload: Json }; Returns: Json }
      validate_routed_event: {
        Args: { p_event_validation_request: Json; p_headers: Json }
        Returns: Json
      }
      validate_session: {
        Args: {
          p_request_id: string
          p_session_id: string
          p_source_system: string
          p_tenant_id: string
          p_trace_id: string
        }
        Returns: {
          invalid_reason: string
          is_valid: boolean
          session_id: string
          validated_at: string
        }[]
      }
      validate_signup: { Args: { input_payload: Json }; Returns: Json }
      verify_auth: { Args: { input_payload: Json }; Returns: Json }
      verify_signed_assertion:
        | {
            Args: {
              p_email: string
              p_pending_signup_id: string
              p_token: string
            }
            Returns: boolean
          }
        | {
            Args: {
              p_email: string
              p_pending_signup_id: string
              p_token: string
            }
            Returns: boolean
          }
      verify_signup: { Args: { input_payload: Json }; Returns: Json }
      verify_token: { Args: { input_payload: Json }; Returns: Json }
      write_onboarding_state: { Args: { input_payload: Json }; Returns: Json }
      write_verification_email_delivery_log: {
        Args: { input_payload: Json }
        Returns: Json
      }
    }
    Enums: {
      evidence_access_scope: "TENANT" | "CONTROL" | "ARTIFACT_TYPE"
      evidence_policy_action: "VIEW" | "DOWNLOAD" | "PACKAGE_EXPORT"
      evidence_policy_status:
        | "DRAFT"
        | "ACTIVE"
        | "SUPERSEDED"
        | "ROLLED_BACK"
        | "ARCHIVED"
      evidence_sensitivity: "PUBLIC" | "INTERNAL" | "CONFIDENTIAL" | "SECRET"
      gov_trace_action_type: "READ" | "WRITE" | "UPDATE" | "EXPORT" | "ROUTE"
      gov_trace_decision_type: "ALLOW" | "DENY" | "HOLD"
      gov_trace_link_type:
        | "WORKFLOW"
        | "COMMAND"
        | "TRACE"
        | "AUDIT_EVENT"
        | "EXTERNAL_LOG"
      gov_trace_outcome_type: "ALLOW" | "DENY" | "OBLIGATION" | "HOLD"
      health_entity_type: "POLICY" | "WORKFLOW" | "API_ENDPOINT"
      health_event_type:
        | "POLICY_VIOLATION"
        | "WORKFLOW_FAILURE"
        | "API_LATENCY_SPIKE"
        | "API_ERROR_RATE_SPIKE"
        | "POLICY_DRIFT"
        | "TENANT_QUOTA_WARNING"
        | "SYNC_FAILURE"
        | "SYSTEM_ERROR"
      health_severity_type: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
      health_status_type: "HEALTHY" | "WARNING" | "CRITICAL" | "FAILED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      evidence_access_scope: ["TENANT", "CONTROL", "ARTIFACT_TYPE"],
      evidence_policy_action: ["VIEW", "DOWNLOAD", "PACKAGE_EXPORT"],
      evidence_policy_status: [
        "DRAFT",
        "ACTIVE",
        "SUPERSEDED",
        "ROLLED_BACK",
        "ARCHIVED",
      ],
      evidence_sensitivity: ["PUBLIC", "INTERNAL", "CONFIDENTIAL", "SECRET"],
      gov_trace_action_type: ["READ", "WRITE", "UPDATE", "EXPORT", "ROUTE"],
      gov_trace_decision_type: ["ALLOW", "DENY", "HOLD"],
      gov_trace_link_type: [
        "WORKFLOW",
        "COMMAND",
        "TRACE",
        "AUDIT_EVENT",
        "EXTERNAL_LOG",
      ],
      gov_trace_outcome_type: ["ALLOW", "DENY", "OBLIGATION", "HOLD"],
      health_entity_type: ["POLICY", "WORKFLOW", "API_ENDPOINT"],
      health_event_type: [
        "POLICY_VIOLATION",
        "WORKFLOW_FAILURE",
        "API_LATENCY_SPIKE",
        "API_ERROR_RATE_SPIKE",
        "POLICY_DRIFT",
        "TENANT_QUOTA_WARNING",
        "SYNC_FAILURE",
        "SYSTEM_ERROR",
      ],
      health_severity_type: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      health_status_type: ["HEALTHY", "WARNING", "CRITICAL", "FAILED"],
    },
  },
} as const
