const homePage_SLUG = "homepage";
// const aboutPage_SLUG = "about";
// const servicesPage_SLUG = "services";
// const testimonialsPage_SLUG = "testimonials";
// const faqPage_SLUG = "faq";

const sectionOurServices_SLUG = "sectionourservices";
const sectionWhyUs_SLUG = "sectionwhyus";
const sectionAboutUs_SLUG = "sectionaboutus";
const sectionSubscribeToNL_SLUG = "sectionsubscribetonl";
const sectionTestimonials_SLUG = "sectiontestimonials";
const sectionFAQ_SLUG = "sectionfaq";
// when appolo sends to backend it adds __typename field to help with cache
// so when adding allowed queris on backend need to add that query
// you can find it in the ajax request header

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
  console.log('slugs=', servicePage_SLUG, correctServicePageSlug);
  return `serviceTemplate: service( id: "${correctServicePageSlug}", idType: URI ) {
      id
      title
      content
  }`;
}


const GraphQLQueries = {
    queries : {
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

        // post & post types that are presented as pages with their own template
        //   allPostSlugs: `allPostSlugs: posts(first: 10000) {
        //     nodes {
        //         id
        //         uri
        //     }
        //   }`,
        //   allServiceSlugs: `allServiceSlugs: services(first: 10000) {
        //         nodes {
        //             id
        //             uri
        //           }
        //   }`,
        //   allProjectsSlugs: `allProjectsSlugs: projects(first: 10000) {
        //       nodes {
        //           id
        //           uri
        //       }
        //   }`,

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
        footerMenuItems: `footerMenuItems:menuItems(where: {location: FOOTER_MENU}, first:100)  
            {
                nodes {
                  databaseId
                  uri
                  label
                  parentDatabaseId
                }
            }`,
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
        // aboutPage:`aboutPage: page( id: "${aboutPage_SLUG}", idType: URI ) {
        //     id
        //     title
        //     content
        //     componentsSectionsAllPages{
        //       componentsSections {
        //         ... on Component {
        //           title
        //         }
        //       }
        //     }
        // }`,
        // testimonialsPage:`testimonialsPage: page( id: "${testimonialsPage_SLUG}", idType: URI ) {
        //     id
        //     title
        //     content
        //     componentsSectionsAllPages{
        //       componentsSections {
        //         ... on Component {
        //           title
        //         }
        //       }
        //     }
        // }`,
        // servicesPage:`servicesPage: page( id: "${servicesPage_SLUG}", idType: URI ) {
        //     id
        //     title
        //     content
        //     componentsSectionsAllPages{
        //       componentsSections {
        //         ... on Component {
        //           title
        //         }
        //       }
        //     }
        // }`,
        // faqPage:`faqPage: page( id: "${faqPage_SLUG}", idType: URI ) {
        //     id
        //     title
        //     content
        //     componentsSectionsAllPages{
        //       componentsSections {
        //         ... on Component {
        //           title
        //         }
        //       }
        //     }
        // }`,


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
    }
};



 


export {
    GraphQLQueries,
    getGenericPageQuery,
    getServiceTemplateQuery
} 