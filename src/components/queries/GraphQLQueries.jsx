const homePage_SLUG = "homepage";
const contactPage_SLUG = "contact";

const sectionOurServices_SLUG = "sectionourservices";
const sectionWhyUs_SLUG = "sectionwhyus";
const sectionAboutUs_SLUG = "sectionaboutus";
const sectionSubscribeToNL_SLUG = "sectionsubscribetonl";
const sectionTestimonials_SLUG = "sectiontestimonials";
const sectionFAQ_SLUG = "sectionfaq";

const options_SLUG = "main-options";

const GraphQLQueries = {

    queries : {

        ///////////////////////////////////////////// options queries /////////////////////////////////////////////
        options: `siteOptions: option( id: "${options_SLUG}", idType: URI ) {
          id
          title
          optionsFieds{
            headerLogo{ sourceUrl }
            footerLogo{ sourceUrl }
            footerText
            footerAddress
            footerAddressLink
            footerPhone1
            footerPhone2
            footerEmail
            footerCopyrights
            socialLinkFacebook
            socialLinkInstagram
            socialLinkTwitter
            socialLinkLinkedin
          }
        }
        `,
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

        contactPage:`contactPage: page( id: "${contactPage_SLUG}", idType: URI ) {
          id
          title
          content
          contactFields{
            smallTitleTop
            mainTitle
            secondaryTitle
            secondaryText
            embedMapCode
            contactImage{
              sourceUrl
            }
            contactTitle
            contactAddress
            contactAddressLink
            contactPhone1
            contactPhone2
            contactEmail
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
        allPostCategories: `allPostCategories: categories(first: 10000) {
          nodes {
              id
              name
              uri
              count
            }
        }`,
        allPostTags: `allPostTags: tags(first: 10000) {
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

      emailSent: `emailSent( form_name: $form_name ,  form_phone: $form_phone, form_email: $form_email, form_message: $form_message, form_google_token: $form_google_token )`,

      ///////////////////////////////////////////// functions queries /////////////////////////////////////////////
      getGenericPageQuery : (genericPage_SLUG) => {
        return `genericPage_${genericPage_SLUG.replaceAll('/','')}: page( id: "${genericPage_SLUG}", idType: URI ) {
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
      },

      getProjects : (limit = 1000) => {
        return `allProjects: projects( first: ${limit} ) {
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
      },

      getBlogPostTemplateQuery : (postPage_SLUG) => {
        return `blogPost: post( id: "${postPage_SLUG.replace('blog/', '')}", idType: URI ) {
            id
            title
            content
            postExtraFields{
              mainImage{
                sourceUrl
              }
            }
        }`
      },
      getBlogPosts : () => {
        return `allPosts: posts( first: $first, after : $after ) {
          pageInfo {
            hasPreviousPage
            hasNextPage
            endCursor
          }
          edges{
            node{
              categories {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
              tags {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
              id
              title
              uri
              excerpt
              featuredImage {
                node {
                  id
                  sourceUrl
                }
              }
            }
          }
        }`;
      },
      getBlogPostsByTag : (tag) => {
        return `allPostsTags: posts( where : { tag:"${tag}" },first: $first, after : $after ) {
          pageInfo {
            hasPreviousPage
            hasNextPage
            endCursor
          }
          edges{
            node{
              categories {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
              tags {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
              id
              title
              uri
              excerpt
              featuredImage {
                node {
                  id
                  sourceUrl
                }
              }
            }
          }
        }`;
      },
      getBlogPostsByCategory : (categoryName) => {
        return `allPostsCategories: posts( 
              where : { categoryName: "${categoryName}" }, 
              first: $first, 
              after : $after 
            ) {
          pageInfo {
            hasPreviousPage
            hasNextPage
            endCursor
          }
          edges{
            node{
              categories {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
              tags {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
              id
              title
              uri
              excerpt
              featuredImage {
                node {
                  id
                  sourceUrl
                }
              }
            }
          }
        }`;
      },
      getAllPosts : (limit = 1000) => {
        return `allPosts: posts( first: ${limit} ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes{
            id
            title
            uri
            excerpt
            featuredImage {
              node {
                id
                 sourceUrl
              }
            }
          }
        }`;
      },
      getServiceTemplateQuery : (servicePage_SLUG) => {
        return `serviceTemplate_${servicePage_SLUG.replaceAll('/', '').replaceAll('-', '')}: service( id: "${servicePage_SLUG.replace('services/', 'cpt_services/')}", idType: URI ) {
            id
            title
            content
            excerpt
        }`;
      },
  }
};



export {
    GraphQLQueries,
} 