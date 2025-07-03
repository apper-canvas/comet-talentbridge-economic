export const candidateService = {
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
          { field: { Name: "email" } },
          { field: { Name: "phone" } },
          { field: { Name: "resume" } },
          { field: { Name: "skills" } },
          { field: { Name: "experience" } },
          { field: { Name: "education" } },
          { field: { Name: "preferred_location" } },
          { field: { Name: "expected_salary" } }
        ],
        orderBy: [
          { fieldName: "Name", sorttype: "ASC" }
        ]
      };
      
      const response = await apperClient.fetchRecords('candidate', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching candidates:", error?.response?.data?.message);
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
          { field: { Name: "email" } },
          { field: { Name: "phone" } },
          { field: { Name: "resume" } },
          { field: { Name: "skills" } },
          { field: { Name: "experience" } },
          { field: { Name: "education" } },
          { field: { Name: "preferred_location" } },
          { field: { Name: "expected_salary" } }
        ]
      };
      
      const response = await apperClient.getRecordById('candidate', id, params);
      
      if (!response || !response.data) {
        return null;
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching candidate with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  create: async (candidateData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [{
          Name: candidateData.Name,
          email: candidateData.email,
          phone: candidateData.phone,
          resume: candidateData.resume,
          skills: candidateData.skills,
          experience: candidateData.experience,
          education: candidateData.education,
          preferred_location: candidateData.preferred_location,
          expected_salary: candidateData.expected_salary
        }]
      };
      
      const response = await apperClient.createRecord('candidate', params);
      
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
        console.error("Error creating candidate:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  update: async (id, candidateData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [{
          Id: id,
          Name: candidateData.Name,
          email: candidateData.email,
          phone: candidateData.phone,
          resume: candidateData.resume,
          skills: candidateData.skills,
          experience: candidateData.experience,
          education: candidateData.education,
          preferred_location: candidateData.preferred_location,
          expected_salary: candidateData.expected_salary
        }]
      };
      
      const response = await apperClient.updateRecord('candidate', params);
      
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
        console.error("Error updating candidate:", error?.response?.data?.message);
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
      
      const response = await apperClient.deleteRecord('candidate', params);
      
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
        console.error("Error deleting candidate:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }
};