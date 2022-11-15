import uuid
from typing import Optional
from pydantic import BaseModel, Field

class Song(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    title: str = Field(...)
    artist: str = Field(...)
    spotify_id: str = Field(...)
    acousticness: str = Field(...)
    danceability: str = Field(...)
    energy: str = Field(...)
    liveness: str = Field(...)
    loudness: str = Field(...)
    tempo: str = Field(...)
    time_signature: str = Field(...)
    url: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {

                "_id": "0661f6e",
                "title": "A Whole New World",
                "artist": "Disney",
                "spotify_id": "0328a",
                "acousticness": "0328a",
                "danceability": "0328a",
                "energy": "0328a",
                "liveness": "0328a",
                "loudness": "0328a",
                "tempo": "0328a",
                "time_signature": "0328a",
                "url": "0328a"
            }
        }

class SongUpdate(BaseModel):
    # id, acousticness, danceability,energy, liveness, loudness, tempo, time_signature, url

    title: Optional[str]
    artist: Optional[str]
    spotify_id: Optional[str]
    acousticness: Optional[str]
    danceability: Optional[str]
    energy: Optional[str]
    liveness: Optional[str]
    loudness: Optional[str]
    tempo: Optional[str]
    time_signature: Optional[str]
    url: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "_id": "0661f6e",
                "title": "A Whole New World",
                "aritst": "Disney",
                "spotify_id": "0328a"
            }
        }