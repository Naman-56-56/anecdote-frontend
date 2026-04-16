import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <span
        className="select-none text-[8rem] font-semibold leading-none text-slate-200 md:text-[10rem]"
        style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
      >
        404
      </span>
      <h1
        className="-mt-8 mb-3 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl"
        style={{ fontFamily: 'var(--FONT-STACK-HEADING)' }}
      >
        Page Not Found
      </h1>
      <p className="mb-8 max-w-md text-sm leading-6 text-slate-500">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
