import { Container, Grid } from '@mui/material';
import Page from '../../components/Page';
import CollectionCard from './components/CollectionCard';

const collections = [
  {
    id: '1',
    avatarUrl: 'https://public.nftstatic.com/static/nft/res/70262fc2980e4860aeb504297f3f8a56.png',
    cover: 'https://public.nftstatic.com/static/nft/res/70262fc2980e4860aeb504297f3f8a56.png',
    name: 'Name Collection',
    description:
      'Highstreet World is a commerce-centric MMORPG where Regions are built in collaboration with brands...'
  },
  {
    id: '2',
    avatarUrl: 'https://public.nftstatic.com/static/nft/res/70262fc2980e4860aeb504297f3f8a56.png',
    cover: 'https://public.nftstatic.com/static/nft/res/dc8c332f59164dc2b509a620f7904952.jpeg',
    name: 'Name Collection',
    description:
      'Highstreet World is a commerce-centric MMORPG where Regions are built in collaboration with brands...'
  },
  {
    id: '2',
    avatarUrl: 'https://public.nftstatic.com/static/nft/res/f3f2fe23cce14cf2bf0b7a8c8eacfa7a.png',
    cover: 'https://public.nftstatic.com/static/nft/res/f3da49c527274a3da0a47b518ff82070.jpeg',
    name: 'Name Collection',
    description:
      'Highstreet World is a commerce-centric MMORPG where Regions are built in collaboration with brands...'
  },
  {
    id: '4',
    avatarUrl: 'https://public.nftstatic.com/static/nft/res/70262fc2980e4860aeb504297f3f8a56.png',
    cover: 'https://public.nftstatic.com/static/nft/res/70262fc2980e4860aeb504297f3f8a56.png',
    name: 'Name Collection',
    description:
      'Highstreet World is a commerce-centric MMORPG where Regions are built in collaboration with brands...'
  },
  {
    id: '5',
    avatarUrl: 'https://public.nftstatic.com/static/nft/res/70262fc2980e4860aeb504297f3f8a56.png',
    cover: 'https://public.nftstatic.com/static/nft/res/dc8c332f59164dc2b509a620f7904952.jpeg',
    name: 'Name Collection',
    description:
      'Highstreet World is a commerce-centric MMORPG where Regions are built in collaboration with brands...'
  },
  {
    id: '6',
    avatarUrl: 'https://public.nftstatic.com/static/nft/res/f3f2fe23cce14cf2bf0b7a8c8eacfa7a.png',
    cover: 'https://public.nftstatic.com/static/nft/res/f3da49c527274a3da0a47b518ff82070.jpeg',
    name: 'Name Collection',
    description:
      'Highstreet World is a commerce-centric MMORPG where Regions are built in collaboration with brands...'
  }
];

export default function MyNFT() {
  return (
    <Page title="My NFTs">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {collections.map((collection) => (
            <Grid key={collection.id} item xs={12} sm={6} md={4}>
              <CollectionCard collection={collection} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
