<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Models\BookRequest;
use App\Models\BookCopy;
use DateTime;
use App\Models\User;
use App\Models\Book;


class BookRequestController extends Controller
{
    public function sendBookRequest(Request $request)
    {
        try {
            $userId = Auth::user()->id;
            $exists = BookRequest::where('user_id', $userId)
                    ->where('book_id', $request->id)
                    ->where('status', 'pending')
                    ->exists();

            if ($exists) {
                return response()->json(['status'=>'error','message' => 'Request already in progress'], 200);
            }else{
                BookRequest::create([
                    'user_id'=> $userId,
                    'book_id'=> $request->id
                ]);
                BookCopy::create([
                    'user_id'=> $userId,
                    'book_id'=> $request->id
                ]);
                return response()->json(['status'=>'success','message' => 'Request Submitted successfully'], 200);
            }
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch posts.'], 500);
        }
    }

    public function getRequestList()
    {
        try {
            $authData = Auth::user();
            $data = BookRequest::join('books','book_requests.book_id','books.id')
                    ->join('users','book_requests.user_id','users.id')
                    ->select('users.*','books.title','book_requests.*');
            if($authData->is_admin == 1){
                $data = $data->get();
            }else{
                $data = $data->where('user_id',$authData->id)->get();
            }
            foreach($data as $key => $value){
                $value['serial_no'] = $key+1;
            }
            return response()->json($data,200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch posts.'], 500);
        }
    }

    public function rejectRequest(Request $request)
    {
        try {
            $data = BookRequest::select('user_id','book_id')->where('id', $request->id)->first()->toArray();
            BookRequest::where('id', $request->id)->update(['status'=>'rejected','remark'=>$request->confirmed]);
            BookCopy::where('user_id', $data['user_id'])->where('book_id', $data['book_id'])->delete();
            return response()->json(['status'=>'success','message' => 'User Request Rejected Successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch posts.'], 500);
        }
    }

    public function approveRequest(Request $request)
    {
        try {
            BookRequest::where('id', $request->id)->update([
                'start_date'=>$request->start_date,
                'end_date'=>$request->end_date,
                'status'=>$request->status
            ]);
            return response()->json(['status'=>'success','message' => 'User Request Approved Successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch posts.'], 500);
        }
    }

    public function returnRequest(Request $request)
    {
        try {
            $data = BookRequest::select('user_id','book_id')->where('id', $request->id)->first()->toArray();

            $bookList = BookRequest::where('id', $request->id)->value('end_date');
            $date1 = new DateTime($bookList);
            $date2 = new DateTime($request->return_date);

            $interval = $date1->diff($date2);
            $daysDifference = $interval->days;
            $daysDifference = ($date2 < $date1)? 0 : $daysDifference;

            BookRequest::where('id', $request->id)->update([
                'returned_date' =>  $request->return_date,
                'late_days'     =>  $daysDifference,
                'status'        =>  $request->status
            ]);
            BookCopy::where('user_id', $data['user_id'])->where('book_id', $data['book_id'])->delete();
            return response()->json(['status'=>'success','message' => 'Book Returned Successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch posts.'], 500);
        }
    }

    public function checkadmin()
    {
        try {
            $response = (Auth::user()->is_admin == 1) ? true : false;
            return response()->json($response, 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch posts.'], 500);
        }
    }

    public function dashboardData(){
        try {
            $user = Auth::user();
            $totalUser = User::get()->count();
            $totalBooks = Book::get()->pluck('copies')->toArray();
            $totalCopies = array_sum($totalBooks);
            $borrowedBooks = BookRequest::where('status','approved');
            $borrowedBooks = ($user->is_admin == 1) ?  $borrowedBooks->count() : $borrowedBooks->where('user_id',$user->id)->count();
            $overDueBooks = BookRequest::where('returned_date',null)->where('end_date','<',date('Y-m-d'));
            $overDueBooks = ($user->is_admin == 1) ?  $overDueBooks->count() : $overDueBooks->where('user_id',$user->id)->count();
            if($user->is_admin == 1){
                $data = [
                    [
                        'icon'=>'fa-users fa-2x  text-white',
                        'color'=>'#FFC107',
                        'words'=>'Total Users',
                        'count'=>$totalUser
                    ],
                    [
                        'icon'=>'fa-book fa-2x text-white',
                        'color'=>'#DC3545',
                        'words'=>'Total Books',
                        'count'=>$totalCopies
                    ],
                    [
                        'icon'=>'fa-book-open-reader fa-2x text-white',
                        'color'=>'#28A745',
                        'words'=>'Borrowed Books',
                        'count'=>$borrowedBooks
                    ],
                    [
                        'icon'=>'fa-clock fa-2x text-white',
                        'color'=>'#007BFF',
                        'words'=>'Overdue Books',
                        'count'=>$overDueBooks
                    ],
                ];
            }else{
                $data = [
                    [
                        'icon'=>'fa-book fa-2x text-white',
                        'color'=>'#DC3545',
                        'words'=>'Total Books',
                        'count'=>$totalCopies
                    ],
                    [
                        'icon'=>'fa-book-open-reader fa-2x text-white',
                        'color'=>'#28A745',
                        'words'=>'Borrowed Books',
                        'count'=>$borrowedBooks
                    ],
                    [
                        'icon'=>'fa-clock fa-2x text-white',
                        'color'=>'#007BFF',
                        'words'=>'Overdue Books',
                        'count'=>$overDueBooks
                    ],
                ];
            }
            return response()->json($data,200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch posts.'], 500);
        }
    }
}
