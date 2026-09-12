import { gql, ApolloClient, InMemoryCache } from '@apollo/client';
import { GraphQLQueries } from '../components/queries/GraphQLQueries';
import { demoLink, executeDemoQuery } from './link';
import { routes, services, projects, posts } from './data';

const q = GraphQLQueries.queries;
const query = fields => gql`query Demo($slg: ID, $first_gbp: Int, $after_gbp: String, $search: String, $first_gbs: Int, $after_gbs: String) { ${fields} }`;

test('all startup fields and every demo detail resolve through Apollo without fetch', async () => {
    const fetchSpy = jest.fn(() => { throw new Error('Unexpected network request'); });
    const originalFetch = global.fetch;
    global.fetch = fetchSpy;
    try {
        const client = new ApolloClient({ link: demoLink, cache: new InMemoryCache() });
        const fields = Object.values(q).filter(value => typeof value === 'string' && !value.includes('$') && !value.startsWith('emailSent') && !value.startsWith('registerToMailchimp')).join('\n');
        const result = await client.query({ query: query(fields) });
        expect(result.data.homePage.homepageFields.heroTitle).toContain('Digital experiences');
        expect(result.data.sectionFAQ.sectionFaqFields.faqCases).toHaveLength(3);
        expect(result.data.sectionTestimonials.sectionTestimonialsFields.testimonialCases).toHaveLength(2);
        for (const route of routes.filter(r => r.menuExtraFieldsForSitemap.reactComponent === 'TemplatePage')) {
            const response = executeDemoQuery(query(q.getGenericPageQuery(route.uri)));
            expect(Object.values(response.data)[0].title).toBeTruthy();
        }
        for (const service of services) {
            const response = executeDemoQuery(query(q.getServiceTemplateQuery(service.uri.slice(1))));
            expect(Object.values(response.data)[0].title).toBe(service.title);
        }
        for (const project of projects) {
            const response = executeDemoQuery(query(q.getProjectTemplateQuery(project.uri)));
            expect(Object.values(response.data)[0].title).toBe(project.title);
        }
        for (const post of posts) {
            expect(executeDemoQuery(query(q.getBlogPostTemplateQuery), { slg: post.uri }).data.blogPost.title).toBe(post.title);
        }
        expect(fetchSpy).not.toHaveBeenCalled();
        client.stop();
    } finally { global.fetch = originalFetch; }
});

test('pagination returns distinct posts, search filters, and missing details are null', () => {
    const first = executeDemoQuery(query(q.getBlogPosts), { first_gbp: 6 }).data.allPosts;
    const second = executeDemoQuery(query(q.getBlogPosts), { first_gbp: 6, after_gbp: first.pageInfo.endCursor }).data.allPosts;
    expect(first.edges).toHaveLength(6);
    expect(second.edges).toHaveLength(2);
    expect(second.pageInfo.hasNextPage).toBe(false);
    expect(new Set([...first.edges, ...second.edges].map(e => e.node.id)).size).toBe(8);
    expect(executeDemoQuery(query(q.getBlogPosts_search), { search: 'ecommerce' }).data.allPosts_search.edges).toHaveLength(1);
    expect(executeDemoQuery(query(q.getBlogPosts_search), { search: 'no-match-here' }).data.allPosts_search.edges).toHaveLength(0);
    expect(executeDemoQuery(query(q.getBlogPostTemplateQuery), { slg: 'missing' }).data.blogPost).toBeNull();
    expect(executeDemoQuery(query(q.getProjectTemplateQuery('projects/missing/'))).data.portfolioProject_projectsmissing).toBeNull();
});
