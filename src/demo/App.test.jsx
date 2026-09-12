import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
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
