import { proxy } from 'valtio';

const state = proxy<{ intro: boolean; selectedColor: string }>({
  intro: true,
  selectedColor: '#000',
});

export default state;
