const validation = {
  // validate data exist in database
  isExistInDb: async (table, colName, colValue) => {
    try {
      let data = await table.findAll({
        where: {
          [colName]: colValue,
        },
      });

      return data.length > 0;
    } catch (error) {
      console.log(error);
    }
  },
};

export default validation;
