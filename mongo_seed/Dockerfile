FROM mongo
# Will be set through Environment Files
ARG DATABASE_URI
ARG USERNAME
ARG PASSWORD

ENV DATABASE_URI ${DATABASE_URI}
ENV USERNAME ${USERNAME}
ENV PASSWORD ${PASSWORD}

COPY factors.json /factors.json

CMD mongoimport --username ${USERNAME} --password ${PASSWORD} --uri ${DATABASE_URI} --collection spotifySongs --drop --file /factors.json --jsonArray


