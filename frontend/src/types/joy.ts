export interface Joy {
  id: { id: string };
  img_url: string;
  name: string;
  votes: string[];
}

export interface ListJoy {
  id: { id: string };
  joy: {
    fields: Joy;
  };
  owner: string;
}

export interface RefreshProps {
  refreshKey: number;
  setRefreshKey: (key: number) => void;
}
