import { CreateBookProvider } from '@/contexts/CreateBookContext';
import MainScreen from './MainScreen';

export default function Page() {
  return (
    <CreateBookProvider>
      <MainScreen />
    </CreateBookProvider>
  );
}
