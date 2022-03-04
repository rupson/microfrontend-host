import React, { lazy, Suspense } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

const CatsApp = lazy(() => import('cats/CatsApp'));
const BlogApp = lazy(() => import('blog/BlogApp'));

function App() {
	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'flex-start',
					height: '100%',
					justifyContent: 'space-around',
				}}
			>
				<div>
					<h1>Cats app (port 3001)</h1>
					<Suspense fallback={<span>--app offline--</span>}>
						<ErrorBoundary fallback={<span>--app offline--</span>}>
							<CatsApp />
						</ErrorBoundary>
					</Suspense>
				</div>
				<div>
					<h1>Blog app (port 3002)</h1>
					<Suspense fallback={<span>--app offline--</span>}>
						<ErrorBoundary fallback={<span>--app offline--</span>}>
							<BlogApp />
						</ErrorBoundary>
					</Suspense>
				</div>
			</div>
		</>
	);
}

export default App;
