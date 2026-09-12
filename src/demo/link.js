import { ApolloLink, Observable } from '@apollo/client';
import { valueFromASTUntyped } from 'graphql';
import { pages, components, services, projects, projectCategories, posts, categories, tags, routes, primaryMenu } from './data';

const clean = value => String(value || '').replace(/^\/+|\/+$/g, '');
const connection = nodes => ({ nodes });
function resolve(name, args) {
    switch (name) {
        case 'page': return pages[clean(args.id)] || null;
        case 'component': return components[clean(args.id)] || null;
        case 'option': return { id: 'options', title: 'Agency settings', optionsFieds: {} };
        case 'menuItems': {
            const location = args.where.location;
            return connection(location === 'SITEMAP_MENU' ? routes : location === 'PRIMARY' ? primaryMenu : location === 'FOOTER_MENU_1' ? primaryMenu.slice(1, 4) : primaryMenu.slice(4).concat(primaryMenu[1]));
        }
        case 'menus': return connection([{ name: args.where.location === 'FOOTER_MENU_1' ? 'Explore' : 'Connect' }]);
        case 'services': return connection(services);
        case 'service': return services.find(s => clean(s.uri) === clean(args.id).replace('cpt_services/', 'services/')) || null;
        case 'projects': return connection(projects.slice(0, args.first || projects.length));
        case 'project': return projects.find(p => clean(p.uri) === clean(args.id)) || null;
        case 'projectCategories': return connection(projectCategories);
        case 'categories': return connection(categories);
        case 'tags': return connection(tags);
        case 'post': return posts.find(p => clean(p.uri) === clean(args.id).replace(/^blog\//, '')) || null;
        case 'posts': {
            const where = args.where || {};
            const filtered = posts.filter(p => (!where.search || `${p.title} ${p.content}`.toLowerCase().includes(where.search.toLowerCase())) && (!where.categoryName || p.categories.edges.some(e => e.node.name.toLowerCase() === where.categoryName.toLowerCase())) && (!where.tag || p.tags.edges.some(e => e.node.name.toLowerCase() === where.tag.toLowerCase())));
            const start = Number(args.after || 0);
            const end = start + (args.first || 6);
            const nodes = filtered.slice(start, end);
            return { nodes, edges: nodes.map(node => ({ node })), pageInfo: { hasPreviousPage: start > 0, hasNextPage: end < filtered.length, endCursor: String(Math.min(end, filtered.length)) } };
        }
        default: throw new Error(`Unsupported demo field: ${name}`);
    }
}
// Project the local records onto the requested GraphQL selection, preserving aliases
// and fragment types so the existing Apollo cache and useQuery hooks keep working.
function project(value, selectionSet, variables, root = false) {
    if (value == null) return null;
    if (Array.isArray(value)) return value.map(item => project(item, selectionSet, variables));
    if (!selectionSet) return value;
    const result = {};
    selectionSet.selections.forEach(field => {
        if (field.kind === 'InlineFragment') {
            if (!field.typeCondition || field.typeCondition.name.value === value.__typename) Object.assign(result, project(value, field.selectionSet, variables));
            return;
        }
        const name = field.name.value;
        const args = Object.fromEntries((field.arguments || []).map(arg => [arg.name.value, valueFromASTUntyped(arg.value, variables)]));
        const item = root ? resolve(name, args) : value[name];
        result[field.alias?.value || name] = project(item, field.selectionSet, variables);
    });
    return result;
}
export function executeDemoQuery(query, variables = {}) {
    const operation = query.definitions.find(d => d.kind === 'OperationDefinition');
    return { data: project({}, operation.selectionSet, variables, true) };
}
export const demoLink = new ApolloLink(operation => new Observable(observer => {
    try {
        observer.next(executeDemoQuery(operation.query, operation.variables));
        observer.complete();
    } catch (error) {
        observer.error(error);
    }
}));
