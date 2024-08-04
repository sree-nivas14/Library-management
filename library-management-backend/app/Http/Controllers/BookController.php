<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Book;
use App\Models\BookCopy;
use Auth;

class BookController extends Controller
{
    public function getBookList()
    {
        try {
                $bookData = Book::all();
                return response()->json($bookData,200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch posts.'], 500);
        }
    }

    public function getAvailableBooks()
    {
        try {
            $data = Book::all();
            foreach($data as $bookData) {
                $book_borrowed_copies = BookCopy::where('book_id', $bookData->id)->count();
                $bookData['copies'] = ((int)$bookData->copies)-($book_borrowed_copies);
            }
            return response()->json($data,200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch posts.'], 500);
        }
    }


    public function deleteBook(Request $request)
    {
        try {
                $userData = Book::where('id', '=', $request->values)->delete();
                return response()->json($userData,200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch posts.'], 500);
        }
    }

    public function addBook(Request $request)
    {
        try {
            $exists = Book::where('isbn', $request->isbn)
                    ->exists();

            if ($exists) {
                $response = 1;
            } else {
                Book::create([
                    'title'             => $request->title,
                    'author'            => $request->author,
                    'isbn'              => $request->isbn,
                    'genre'             => $request->genre,
                    'publication_date'  => $request->publication_date,
                    'copies'            => $request->copies,
                ]);
                $response = 0;
            }
            return response()->json($response,200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch posts.'], 500);
        }
    }

    public function updateBook(Request $request)
    {
        try {
            $dataIsPresent = Book::where('title', $request->title)
                    ->where('author', $request->author)
                    ->where('isbn', $request->isbn)
                    ->where('genre', $request->genre)
                    ->where('publication_date', $request->publication_date)
                    ->where('copies', $request->copies)
                    ->where('id',$request->id)
                    ->count();
            if ($dataIsPresent != 0) {
                $response = 1;
            } else {
                Book::where('id', $request->id)->update([
                    'title'             => $request->title,
                    'author'            => $request->author,
                    'isbn'              => $request->isbn,
                    'genre'             => $request->genre,
                    'publication_date'  => $request->publication_date,
                    'copies'            => $request->copies,
                ]);
                $response = 0;
            }
            return response()->json($response,200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch posts.'], 500);
        }
    }
}
