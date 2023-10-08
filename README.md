### Solara Documentation

# Project Solara

We have extracted datasets pertaining to chlorofluorocarbons (CFCs), solar flux, ozone, and temperature, complemented with geospatial mapping metadata from NASA. This integration aims to enhance the visualization algorithms in VISIONS's current plume mapping system, which renders greenhouse gas signatures, specifically carbon dioxide and methane. We call this project Solara.

Our solution expands the visualization algorithms to include CFCs, which are critical in understanding ozone depletion. This enhancement directly addresses the challenge's requirement for "enhanced features." Solara takes steps towards diversifying the data sources, thereby making VISIONS a more holistic tool that can analyze more factors in climate change. By broadening the scope of analysis to accommodate these compounds, the VISIONS tool can provide a more intricate and nuanced understanding of atmospheric dynamics and the threats posed by certain pollutants. Furthermore, Solara's initiative to diversify data sources not only amplifies the versatility of VISIONS but also ensures it becomes a comprehensive and all-encompassing tool. This is of paramount importance as it empowers researchers and scientists with a multifaceted view of our atmosphere, enabling more informed decisions, comprehensive research, and the potential to devise more effective strategies for environmental preservation.

## Dataset Analysis

Through computational analysis and spatial interpolation, this multi-dimensional dataset helps identify anomaly regions or "hotspots". Empirical observations indicate an inverse correlation between regions manifesting high CFC concentrations and reduced ozone densities. By running this dataset through VISIONS, we enable an accessible visual understanding of climatic subsystems. This computational approach underscores the disturbances introduced by CFCs in localized climatic matrices and offers predictive modeling capabilities for climate change. Combining the visualization of CFC, solar flux, and temperature datasets in addition to the carbon dioxide and methane plume data already present in the VISIONS model, Solara allows for a more comprehensive understanding of emissions and their effects. The project's goal is to facilitate access to important data and allow for open source research, centralized data, and a simple way to test CFC policies and initiatives.

## How Solara Works

We used HTML, CSS, Javascript, React, and Python to develop our project. Through the direct integration of CSA and NASA data into the program along with temperature data fed through an API, Solara can use live data to ensure accuracy and allow for real-time data analysis.

Solara ingests raw data, seamlessly pulling it from various sources such as APIs, and tapping into data banks from organizations like NASA and CSA. Once this raw data is retrieved, the app initiates a parsing mechanism to structure and refine it. Following this, the parsed data is directed to a central index, which then serves as the foundation for its deployment within the web application. One of the primary visual outputs users experience is the data manifested as a map, providing an intuitive and spatial perspective. If users want to explore different datasets or perspectives, their choices prompt a recall from the index. This selected data is then drawn and displayed. Crucially, the system's design ensures that any such user-driven data recall feeds back into the index, initiating a cycle that repeats steps 3 through 7, offering a dynamic and responsive user experience for new requests.

## Accessibility and User-Friendly Content

Our primary objective was to ensure that every facet of our endeavor, from the interface design to the final presentation, was accessible to users of all ages and abilities. On our diverse planet, it's imperative that technological innovations cater to as wide an audience as possible. With this in mind, we decided to use the GPT-4 API to ensure our project is user-friendly.

Understanding that the language and content we use can greatly affect user accessibility, we leveraged GPT-4 to assist in generating user-friendly content. This ensured that the terminologies, instructions, and other textual components of our project were presented in a manner that was clear and concise, regardless of the user's age or ability. Whether it was simplifying complex jargons for younger users or providing voice-based guidance for those with visual impairments, GPT-4 played a crucial role in helping us create a universally friendly user experience. We also used GPT-4 and Github Copilot to work through syntax errors within our code, and ensure that we did not spend too much time debugging.



## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
