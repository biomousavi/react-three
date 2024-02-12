import { proxy } from 'valtio';

const state = proxy<{
  intro: boolean;
  selectedColor: string;
  selectedDecal: string;
}>({
  intro: true,
  selectedColor: '#000',
  selectedDecal: 'leaf',
});

export default state;
