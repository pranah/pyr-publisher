import { SpaceClient } from '@fleekhq/space-client';

export default {
    // strict: false,
    state: () => ({
        collectorPageSwitch: false,
        publisherPageSwitch: false,
        client: new SpaceClient({
            url: `http://localhost:9998`
        }),
        publishedContent: [],
        collectedContent: [],
    }),
    mutations: {
        publisherPageSwitchFlip: (state, page) => {
            state.publisherPageSwitch = page;
        },
        collectorPageSwitchFlip: (state, page) => {
            state.collectorPageSwitch = page;
        },
        publishContent: (state, content) => {
            state.publishedContent.push(content);
        },
        collectContent: (state, content) => {
            console.log(content.title);
            state.collectedContent.push(content);
        },
    },
    actions: {
        publish: ({ state, commit }, content) => {
            console.log(content);
            console.log(contract);
            // state.client
            // .createBucket({ slug: content.title})
            // .then((res) => {
            //     const stream = state.client.addItems({
            //     bucket: content.title,
            //     targetPath: '/', // path in the bucket to be saved
            //     sourcePaths: [content.file]
            //     });
            
            //     stream.on('data', (data) => {
            //     console.log('data: ', data);
            //     });
            
            //     stream.on('error', (error) => {
            //     console.error('error: ', error);
            //     });
            
            //     stream.on('end', () => {
            //     state.client
            //     .shareBucket({ bucket: content.title })
            //     .then((res) => {
    
            //         const threadInfo = res.getThreadinfo();
            //         console.log('key:', threadInfo.getKey());
            //         console.log('addresses:', threadInfo.getAddressesList());
            //         commit('publishContent', {
            //         title: content.title,
            //         key: threadInfo.getKey(),
            //         addresses: threadInfo.getAddressesList()
            //         })
            //     })
            //     .catch((err) => {
            //         console.error(err);
            //     });
            //     });
            // })
            // .catch((err) => {
            //     if(err.message == "Http response at 400 or 500 level"){
            //     console.log("Please connect a Space Daemon Instance");
            //     } else {
            //     console.error(err);
            //     }
            // });
        },
        getContent: async ({}, content) => {
            console.log(content.title);
            const bucket = content.title;
            
            const dirRes = await state().client.listDirectories({
                bucket,
            });
            
            const entriesList = dirRes.getEntriesList();
            
            const openFileRes = await state().client.openFile({
                bucket,
                path: entriesList[0].getPath(),
            });
            
            const location = openFileRes.getLocation();
            console.log(location); // "/path/to/the/copied/file"
        },
    }
}