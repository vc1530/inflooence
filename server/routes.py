from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List

from models import Song, SongUpdate

router = APIRouter()

@router.post("/", response_description="Create a new song", status_code=status.HTTP_201_CREATED, response_model=Song)
def create_song(request: Request, song: Song = Body(...)):
    song = jsonable_encoder(song)
    new_song = request.app.database["songs"].insert_one(song)
    created_song = request.app.database["songs"].find_one(
        {"_id": new_song.inserted_id}
    )

    return created_song

@router.get("/", response_description="List all songs", response_model=List[Song])
def list_songs(request: Request):
    songs = list(request.app.database["songs"].find(limit=100))
    return songs

@router.get("/{id}", response_description="Get a single song by id", response_model=Song)
def find_song(id: str, request: Request):
    if (song := request.app.database["songs"].find_one({"_id": id})) is not None:
        return song
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Song with ID {id} not found")

@router.put("/{id}", response_description="Update a song", response_model=Song)
def update_song(id: str, request: Request, song: SongUpdate = Body(...)):
    song = {k: v for k, v in song.dict().items() if v is not None}
    if len(song) >= 1:
        update_result = request.app.database["songs"].update_one(
            {"_id": id}, {"$set": song}
        )

        if update_result.modified_count == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Song with ID {id} not found")

    if (
        existing_song := request.app.database["songs"].find_one({"_id": id})
    ) is not None:
        return existing_song

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Song with ID {id} not found")

@router.delete("/{id}", response_description="Delete a song")
def delete_song(id: str, request: Request, response: Response):
    delete_result = request.app.database["songs"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Song with ID {id} not found")