import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, ApolloLink, Observable } from '@apollo/client';
import App from '../App';
import { demoLink } from './link';

let client;
beforeEach(() => {
    window.scrollTo = jest.fn();
    client = new ApolloClient({ link: demoLink, cache: new InMemoryCache() });
});
afterEach(() => { cleanup(); client.stop(); });
function open(path) {
    window.history.replaceState({}, '', path);
    return render(<ApolloProvider client={client}><App /></ApolloProvider>);
}
test('home and newsletter work without third-party form scripts', async () => {
    open('/');
    expect(await screen.findByRole('heading', { name: 'Digital experiences that move your business forward.' })).toBeInTheDocument();
    const submit = await screen.findByRole('button', { name: /subscribe/i });
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'Demo' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Visitor' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'demo@example.com' } });
    fireEvent.submit(submit.closest('form'));
    expect(screen.getByRole('status')).toHaveTextContent('Nothing was sent or saved');
    expect(document.querySelector('script[src*="recaptcha"]')).toBeNull();
});
test('contact demo submission confirms locally', async () => {
    open('/contact/');
    const submit = await screen.findByRole('button', { name: 'Send Now' });
    for (const [placeholder, value] of [['Name', 'Demo User'], ['Email', 'demo@example.com'], ['Phone', '123456789'], ['Message', 'A sample inquiry']]) {
        fireEvent.change(screen.getByPlaceholderText(placeholder), { target: { value } });
    }
    fireEvent.submit(submit.closest('form'));
    expect(screen.getByRole('status')).toHaveTextContent('Nothing was sent or saved');
});
test('blog load more retains previous posts', async () => {
    open('/blog/');
    const more = await screen.findByRole('link', { name: 'Load More' });
    expect(screen.queryByText('Preparing for Launch')).toBeNull();
    fireEvent.click(more);
    expect(await screen.findByText('Preparing for Launch')).toBeInTheDocument();
    expect(screen.getByText('Planning a Better Website')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Load More' })).toBeNull();
});
test.each([['/about/', 'About Us'], ['/portfolio/', 'Portfolio'], ['/faq/', 'Frequently Asked Questions'], ['/category/insights/', 'Blog: Insights'], ['/tag/strategy/', 'Blog: Strategy'], ['/services/ecommerce/', 'Ecommerce'], ['/projects/project-1/', 'Studio North'], ['/blog/insight-1/', 'Planning a Better Website'], ['/search/no-match-here/', 'No results found']])('renders %s', async (path, heading) => {
    open(path);
    expect((await screen.findAllByRole('heading', { name: heading })).length).toBeGreaterThan(0);
});

test('contact requests only layout and contact data', async () => {
    const requests = [];
    client.stop();
    client = new ApolloClient({
        link: new ApolloLink((operation, forward) => {
            requests.push(operation.query.definitions.find(d => d.kind === 'OperationDefinition').selectionSet.selections.map(f => f.name.value));
            return forward(operation);
        }).concat(demoLink),
        cache: new InMemoryCache(),
    });
    open('/contact/');
    await screen.findByRole('button', { name: 'Send Now' });
    expect(requests).toHaveLength(2);
    expect(requests[0]).toEqual(['menuItems', 'menuItems', 'menuItems', 'menus', 'menuItems', 'menus', 'option']);
    expect(requests[1]).toEqual(['page']);
});

test('a page query failure preserves navigation and can be retried', async () => {
    client.stop();
    let failContact = true;
    client = new ApolloClient({
        link: new ApolloLink((operation, forward) => {
            if (operation.operationName === 'CONTACT_CONTENT' && failContact) {
                return new Observable(observer => {
                    const timer = setTimeout(() => observer.error(new Error('Content unavailable')), 20);
                    return () => clearTimeout(timer);
                });
            }
            return forward(operation);
        }).concat(demoLink),
        cache: new InMemoryCache(),
    });
    open('/contact/');
    expect(await screen.findByText('Loading content…')).toBeInTheDocument();
    const retry = await screen.findByRole('button', { name: 'Try again' });
    expect(screen.getAllByRole('link', { name: 'Services' }).length).toBeGreaterThan(0);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    failContact = false;
    fireEvent.click(retry);
    expect(await screen.findByRole('button', { name: 'Send Now' })).toBeInTheDocument();
    expect(screen.queryByRole('alert')).toBeNull();
});
