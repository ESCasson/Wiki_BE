const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Section {
    id: ID!
    name: String!
  }
  type Area { 
    id: ID! 
    name: String!
    sections: [Section]
  }
  input SectionInput {
    id: ID
    name: String!
  }
  type SectionText {
    id: ID!
    name: String!
    area: String!
    sectionID: String!
    sectionHTML: String!
  }

  input SectionTextInput {
    name: String!
    area: String!
    sectionID: String!
    sectionHTML: String!
  }

  type Query { 
    getAreas: [Area]
    sectionText(sectionID: String!): SectionText
    sectionTextsByArea(area: String!): [SectionText]
    sectionTextsBySectionId(sectionID: String!): [SectionText] 
  }

  type Mutation { 
    addArea(name: String!, sections: [SectionInput]): Area 
    updateArea(id: ID!, name: String!): Area
    updateAreaSections(id: ID!, sections: [SectionInput]): Area 
    deleteArea(id: ID!): Area
    addSectionText(
      name: String!, area: String!,sectionHTML: String!, sectionID: String!): 
        SectionText
    updateSectionText(
      id: ID!, sectionHTML: String!): 
        SectionText
  }
`;

module.exports = { typeDefs };
