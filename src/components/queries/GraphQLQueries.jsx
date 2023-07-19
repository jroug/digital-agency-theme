const homePage_SLUG = "homepage";

const sectionOurServices_SLUG = "sectionourservices";
const sectionWhyUs_SLUG = "sectionwhyus";
const sectionAboutUs_SLUG = "sectionaboutus";
const sectionSubscribeToNL_SLUG = "sectionsubscribetonl";
const sectionTestimonials_SLUG = "sectiontestimonials";
const sectionFAQ_SLUG = "sectionfaq";
 
// for TemplatePage.jsx
const getGenericPageQuery = (genericPage_SLUG) => {
  return `genericPage: page( id: "${genericPage_SLUG}", idType: URI ) {
      id
      title
      content
      componentsSectionsAllPages{
        componentsSections {
          ... on Component {
            title
          }
        }
      }
  }`;
}

// for TemplateServiceInner.jsx
const getServiceTemplateQuery = (servicePage_SLUG) => {
  const correctServicePageSlug = servicePage_SLUG.replace('services/', 'cpt_services/');
  return `serviceTemplate: service( id: "${correctServicePageSlug}", idType: URI ) {
      id
      title
      content
      excerpt
  }`;
}

// for TemplateBlogInner.jsx
const getBlogPostTemplateQuery = (postPage_SLUG) => {
  const correctPostSlug = postPage_SLUG.replace('blog/', '');
  return `blogPost: post( id: "${correctPostSlug}", idType: URI ) {
      id
      title
      content
  }`;
}

// // for TemplateBlogInner.jsx
// const getProjectTemplateQuery = (projectPage_SLUG) => {
//   const correctProjectSlug = projectPage_SLUG.replace('blog/', '');
//   return `portfolioProject: project( id: "${correctProjectSlug}", idType: URI ) {
//       id
//       title
//       content
//       projectExtraFields{
//         listThumb{
//           sourceUrl
//         }
//         mainImage{
//           sourceUrl
//         }
//         secondImage{
//           sourceUrl
//         }
//         projectInfo
//       }
//   }`;
// }

// for TemplateBlogInner.jsx
// const getProjects = (excludeProject_SLUG) => {
//   return `allProjects: projects( first:1000 ) {
//     nodes{
//       id
//       title
//       projectCategories {
//         nodes {
//             id
//             name
//         }
//       }
//       projectExtraFields{
//         listThumb{
//           sourceUrl
//         }
//       }
//     }
//   }`;
// }

 


const GraphQLQueries = {

    queries : {

        ///////////////////////////////////////////// menu queries /////////////////////////////////////////////

        // query for sitemap
        sitemapMenuItems: `sitemapMenuItems:menuItems(where: {location: SITEMAP_MENU} , first:100   )  
        {
            nodes {
                  id
                  uri
                  label
                  menuExtraFieldsForSitemap{
                    reactComponent
                  }
            }
        }`,
        // I get the parents and the others as children of them
        primaryMenuItems: `primaryMenuItems:menuItems(where: {location: PRIMARY, parentDatabaseId:0} , first:100   )  
        {
            nodes {
                  databaseId
                  uri
                  label
                  parentDatabaseId
                  childItems{
                    nodes{
                      databaseId
                      uri
                      label
                      parentDatabaseId
                    }
                  }
            }
        }`,
        footerMenuItems1: `footerMenuItems1:menuItems(where: {location: FOOTER_MENU_1}, first:100)  
            {
                nodes {
                  databaseId
                  uri
                  label
                  parentDatabaseId
                }
            }
            menuName1:menus(where: {location: FOOTER_MENU_1} ) {
              nodes {
                name
              }
            }
            `,
        footerMenuItems2: `footerMenuItems2:menuItems(where: {location: FOOTER_MENU_2}, first:100)  
        {
            nodes {
              databaseId
              uri
              label
              parentDatabaseId
            }
        }
        menuName2:menus(where: {location: FOOTER_MENU_2} ) {
          nodes {
            name
          }
        }`,

        ///////////////////////////////////////////// pages queries /////////////////////////////////////////////

        homePage:`homePage: page( id: "${homePage_SLUG}", idType: URI ) {
            id
            title
            content
            homepageFields{
                heroImage { sourceUrl }
                heroImageOverlay { sourceUrl }
                heroTitle
                heroSubTitle
                heroButtonText
                heroButtonUrl
            }
            componentsSectionsAllPages{
              componentsSections {
                ... on Component {
                  title
                }
              }
            }
        }`,

        ///////////////////////////////////////////// helping queries /////////////////////////////////////////////

        allServices: `allServices: services(first: 10000) {
          nodes {
              id
              title
              uri
            }
        }`,


        allProjectCategories: `allProjectCategories: projectCategories(first: 10000) {
          nodes {
              id
              name
              uri
            }
        }`,

        ///////////////////////////////////////////// section queries /////////////////////////////////////////////

        sectionAboutUs:`sectionAboutUs: component( id: "${sectionAboutUs_SLUG}", idType: URI ) {
            id
            title
            sectionAboutUsFields{
              smallTitleTop
              mainTitle
              mainText
              personName
              personTitle
              personImage{
                sourceUrl
              }
              mainImage{
                sourceUrl
              }
            }
        }`,
        sectionOurServices:`sectionOurServices: component( id: "${sectionOurServices_SLUG}", idType: URI ) {
            id
            title
            sectionOurServicesFields{
              smallTitleTop
              mainTitle
              box1 {
                boxIconClass
                boxTitle
                boxText
                boxLink
              }
              box2 {
                boxIconClass
                boxTitle
                boxText
                boxLink
              }
              box3 {
                boxIconClass
                boxTitle
                boxText
                boxLink
              }
              box4 {
                boxIconClass
                boxTitle
                boxText
                boxLink
              }
              box5 {
                boxIconClass
                boxTitle
                boxText
                boxLink
              }
            }
        }
        `,
        sectionWhyUs:`sectionWhyUs: component( id: "${sectionWhyUs_SLUG}", idType: URI ) {
          id
          title
          sectionWhyUsFields{
            smallTitleTop
            mainTitle
            mainSubTitle
            featuresTitle
            features
            featuresButtonText
            featuresButtonLink
            box1 {
              boxIconClass
              boxTitle
              boxText
            }
            box2 {
              boxIconClass
              boxTitle
              boxText
            }
            box3 {
              boxIconClass
              boxTitle
              boxText
            }
          }
      }
      `,
      sectionSubscribeToNL:`sectionSubscribeToNL: component( id: "${sectionSubscribeToNL_SLUG}", idType: URI ) {
        id
        title
        sectionSubscribeToNLFields{
          mainImage{
            sourceUrl
          }
          mainTitle
        }
      }
      `,
      sectionTestimonials:`sectionTestimonials: component( id: "${sectionTestimonials_SLUG}", idType: URI ) {
        id
        title
        sectionTestimonialsFields{
          smallTitleTop
          mainTitle
          testimonialCases{
            ... on Testimonial {
              id
              title
              excerpt
              content
              featuredImage {
                node {
                  id
                  sourceUrl
                }
              } 
            }
          }
        }
      }
      `,
      sectionFAQ:`sectionFAQ: component( id: "${sectionFAQ_SLUG}", idType: URI ) {
        id
        title
        sectionFaqFields{
          smallTitleTop
          mainTitle
          mainText
          buttonLink
          buttonText
          faqCases{
            ... on FAQ {
              id
              title
              content
            }
          }
        }
      }
      `,

      ///////////////////////////////////////////// functions queries /////////////////////////////////////////////
      getProjects : (excludeId, limit = 1000) => {
        return `allProjects: projects( where: {notIn :"${excludeId}"}, first: ${limit} ) {
          nodes{
            id
            title
            uri
            projectCategories {
              nodes {
                  id
                  name
                  uri
              }
            }
            projectExtraFields{
              listThumb{
                sourceUrl
              }
            }
          }
        }`;
      },

      // for template portfolio inner
      getProjectTemplateQuery : (projectPage_SLUG) => {
        return `portfolioProject: project( id: "${projectPage_SLUG.replace('blog/', '')}", idType: URI ) {
            id
            title
            content
            projectExtraFields{
              listThumb{
                sourceUrl
              }
              mainImage{
                sourceUrl
              }
              secondImage{
                sourceUrl
              }
              projectInfo
            }
        }`;
      }
  }
};



export {
    GraphQLQueries,
    getGenericPageQuery,
    getServiceTemplateQuery,
    getBlogPostTemplateQuery,
    // getProjectTemplateQuery,
} 