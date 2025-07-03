export const applicationService = {
  getAll: async () => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "status" } },
          { field: { Name: "applied_date" } },
          { field: { Name: "cover_letter" } },
          { field: { Name: "resume_version" } },
          { 
            field: { Name: "job_id" },
            referenceField: { field: { Name: "Name" } }
          },
          { 
            field: { Name: "candidate_id" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        orderBy: [
          { fieldName: "applied_date", sorttype: "DESC" }
        ]
      };
      
      const response = await apperClient.fetchRecords('application', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching applications:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  getById: async (id) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "status" } },
          { field: { Name: "applied_date" } },
          { field: { Name: "cover_letter" } },
          { field: { Name: "resume_version" } },
          { 
            field: { Name: "job_id" },
            referenceField: { field: { Name: "Name" } }
          },
          { 
            field: { Name: "candidate_id" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      };
      
      const response = await apperClient.getRecordById('application', id, params);
      
      if (!response || !response.data) {
        return null;
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching application with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  create: async (applicationData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [{
          Name: applicationData.Name || `Application for Job ${applicationData.job_id}`,
          job_id: applicationData.job_id,
          candidate_id: applicationData.candidate_id,
          status: applicationData.status || 'submitted',
          applied_date: applicationData.applied_date || new Date().toISOString(),
          cover_letter: applicationData.cover_letter,
          resume_version: applicationData.resume_version
        }]
      };
      
      const response = await apperClient.createRecord('application', params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating application:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  update: async (id, applicationData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [{
          Id: id,
          Name: applicationData.Name,
          job_id: applicationData.job_id,
          candidate_id: applicationData.candidate_id,
          status: applicationData.status,
          applied_date: applicationData.applied_date,
          cover_letter: applicationData.cover_letter,
          resume_version: applicationData.resume_version
        }]
      };
      
      const response = await apperClient.updateRecord('application', params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating application:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  delete: async (id) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        RecordIds: [id]
      };
      
      const response = await apperClient.deleteRecord('application', params);
      
      if (!response.success) {
        console.error(response.message);
        return false;
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting application:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }
};