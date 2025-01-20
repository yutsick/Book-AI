import { CreateBookProvider } from '@/contexts/CreateBookContext';
import { GenreProvider } from '@/contexts/CreateGenreContext';
import MainScreen from './MainScreen';

export default function Page() {
  return (
    <GenreProvider>
      <CreateBookProvider>
        <MainScreen />
      </CreateBookProvider>
    </GenreProvider>
  );
}
