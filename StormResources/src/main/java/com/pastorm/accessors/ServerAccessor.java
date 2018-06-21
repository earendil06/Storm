package com.pastorm.accessors;

import com.ddmodel.Block;
import com.pastorm.StormParser;
import com.pastorm.utils.StormProperties;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

import java.util.Optional;
import java.util.Properties;

public class ServerAccessor implements Accessor {

    private StormParser parser = new StormParser();
    private String host;
    private String port;

    public ServerAccessor(){
        Properties properties = StormProperties.getStormProperties();
        host = properties.getProperty("host", "localhost");
        port = properties.getProperty("port", "5000");
    }

    @Override
    public Optional<Block> getBlockByName(String blockName) {

        Client client = Client.create();

        WebResource resource = client.resource("http://" + host + ":" + port + "/" + "api/block/" + blockName);

        ClientResponse response = resource.get(ClientResponse.class);

        String blockDownloaded = response.getEntity(String.class);

        return parser.parseBlock(blockDownloaded);
    }

    @Override
    public void saveBlock(String blockName, String block) {
        //todo
    }
}
