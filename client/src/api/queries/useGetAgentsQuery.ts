import { useQuery } from "@tanstack/react-query";
import type { CustomQueryResult } from "../types";
import { Queries } from "./queries";

export type Agent = {
    id: string;
    name: string;
};

export const useGetAgentsQuery = (): CustomQueryResult<Agent[] | undefined> => {
    return useQuery({
        queryKey: [Queries.AGENTS],
        queryFn: async () => {
            const url = "http://localhost:3001/agents";
            console.log(`Requesting agents from ${url}`);

            try {
                const res = await fetch(url);

                if (!res.ok) {
                    throw new Error(`Failed to fetch agents: ${res.status} ${res.statusText}`);
                }

                console.log("Response object:", res);

                const data = await res.json();
                console.log("Received data:", data);

                return data.agents as Agent[];
            } catch (error) {
                console.error(`Error fetching agents from ${url}:`, error);
                throw error; // Ensure React Query knows about the failure
            }
        },
        retry: (failureCount) => failureCount < 3,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });
};


// import { useQuery } from "@tanstack/react-query";
// import type { CustomQueryResult } from "../types";
// import { Queries } from "./queries";
// import { ROUTES } from "../routes";

// export type Agent = {
//     id: string;
//     name: string;
// };

// export const useGetAgentsQuery = (): CustomQueryResult<Agent[] | undefined> => {
//     return useQuery({
//         queryKey: [Queries.AGENTS],
//         queryFn: async () => {
//             const url = ROUTES.getAgents();
//             console.log(`Requesting agents from ${url}`);

//             try {
//                 const res = await fetch(url);

//                 if (!res.ok) {
//                     throw new Error(`Failed to fetch agents: ${res.status} ${res.statusText}`);
//                 }

//                 console.log("res:", res);

//                 const data = await res.json();
//                 console.log("Received data:", data);

//                 return data.agents as Agent[];
//             } catch (error) {
//                 console.error(`Error fetching agents from ${url}:`, error);
//                 throw error; // Ensure React Query knows about the failure
//             }
//         },
//         retry: (failureCount) => failureCount < 3,
//         staleTime: 5 * 60 * 1000, // 5 minutes
//         refetchOnWindowFocus: false,
//     });
// };