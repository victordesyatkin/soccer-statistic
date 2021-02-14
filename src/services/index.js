import bind from "bind-decorator";

class StatisticService {
  apiBase = "";

  apiKey = "";

  constructor(options) {
    const { API_BASE, API_KEY } = options || {
      API_KEY: process.env.API_KEY,
      API_BASE: process.env.API_BASE,
    };
    this.apiBase = API_BASE;
    this.apiKey = API_KEY;
  }

  @bind
  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}`, {
      headers: { "X-Auth-Token": this.apiKey },
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    const results = await res.json();
    return results;
  }

  @bind
  async getAllCompetitions() {
    const results = await this.getResource("/competitions");
    return results.competitions;
  }

  getPerson(id) {
    return this.getResource(`/people/${id}/`);
  }

  async getAllPlanets() {
    const res = await this.getResource(`/planets/`);
    return res.results;
  }

  getPlanet(id) {
    return this.getResource(`/planets/${id}/`);
  }

  async getAllStarships() {
    const res = await this.getResource(`/starships/`);
    return res.results;
  }

  getStarship(id) {
    return this.getResource(`/starships/${id}/`);
  }
}

export default StatisticService;
