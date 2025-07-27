import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/app/routes';

export default function AboutPage(): ReactNode {
  return (
    <div className="max-w-2xl mx-auto p-4 border-t-2 border-b-2">
      <section className="mb-8">
        <h1 className="text-xl font-semibold mb-2">Author Information: </h1>
        <p className="mb-4">
          This app was created as part of the RS School React course to demonstrate the use of React with TypeScript, React Router, and
          the Rick and Morty API.
        </p>
        <p>
          It allows you to browse characters from the Rick and Morty
          universe, search for specific characters, and paginate through the results.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-10">Course Information: </h2>
        <a
          href="https://rs.school/courses/reactjs"
          className="inline-block"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/rs_school.svg"
            alt="RS School logo"
            className="h-30 hover:opacity-80 transition-opacity rounded-md border-2 p-3"
          />
        </a>
      </section>

      <Link
        to={ROUTES.HOME}
        className="inline-block mt-4 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition"
      >
        Back Home
      </Link>
    </div>
  );
}
