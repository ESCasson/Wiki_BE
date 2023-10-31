const Area = require('./models/area').Area
const SectionText = require('./models/sectionText').SectionText

const resolvers = {
  Query: {
    getAreas: async (parent, args) => {
      const query = Area.find({})
      return await query
    },
    sectionText: async (parent, args) => {
      const query = SectionText.find({})
      return await query
    },
    sectionTextsByArea: async (parent, args) => {
      const { area } = args;

      try {
        const sectionTexts = await SectionText.find({ area });
        return sectionTexts;
      } catch (err) {
        console.error('Error while querying sectionTexts:', err);
        throw err;
      }
    },
    sectionTextsBySectionId: async (parent, args) => {
      const { sectionID } = args;

      try {
        const sectionTexts = await SectionText.find({ sectionID });
        return sectionTexts;
      } catch (err) {
        console.error('Error while querying  by ID:', err);
        throw err;
      }
    }

  },

  Mutation: {
    addArea: (parent, args) => {

      const sectionsData = args.sections.map(sectionInput => ({
        name: sectionInput.name
      }))

     try  {let area = new Area({
        name: args.name,
        sections: sectionsData
      });
      return area.save();
      }
     catch (err) {
       console.error('Error while adding area:', err);
       throw err;
    }

    },
    updateArea: (parent, args) => {
      if (!args.id) return;
      try {
        return Area.findOneAndUpdate(
          {
            _id: args.id
          },
          {
            $set: {
              name: args.name,
              sections: args.sections
            }
          }, { new: true }
        )
      }
      catch (err) {
        console.log('Something went wrong when updating the area')
      }
    },
    updateAreaSections: async (parent, args) => {
      if (!args.id) return;
      try {
        return await Area.findOneAndUpdate(
          {
            _id: args.id
          },
          {
            $set: {
              name: args.name,
              sections: args.sections
            }
          }, { new: true }
        )
      }
      catch (err) {
        console.log('Something went wrong when updating the sections')
      }
    },
    addSectionText: async (parent, args) => {
      try {
        console.log(args)
        let sectionText = new SectionText({
          name: args.name,
          area: args.area,
          sectionHTML: args.sectionHTML,
          sectionID: args.sectionID
        });
        const savedSectionText = await sectionText.save();
        return savedSectionText;
      }
      catch (err) {
        console.error('Error while adding sectionText:', err);
        throw err;
      }
    },
    updateSectionText: async (parent, args) => {
      if (!args.id) return;
      try {
        return await SectionText.findOneAndUpdate(
          {
            _id: args.id
          },
          {
            $set: {
              sectionHTML: args.sectionHTML 
            }
          }, { new: true }
        )
      }
      catch (err) {
        console.log('Something went wrong when updating the section text')
      }
    },
  }
} 
module.exports = { resolvers };