using Api.Data;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// https://www.youtube.com/watch?v=WxkI70w-bwY&t=1240s
//https://www.youtube.com/watch?v=Wit8nv1ZorQ&list=PL0mNG_n6Cohs7RvP3ZivSDkPLcavJ8KLS&index=2

namespace Api.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly AppDbContext _context;
        public StudentController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Student>> GetStudents()
        {
            var students = await _context.Students.AsNoTracking().ToListAsync();
            return students;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = await _context.Students.AsNoTracking().FirstOrDefaultAsync(s => s.Id == id);
            if (student == null) return NotFound();
            return student;
        }

        [HttpPost]
        public async Task<IActionResult> CreateStudent(Student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _context.AddAsync(student);
            var result = await _context.SaveChangesAsync();

            return result > 0 ? Ok(student) : BadRequest("Failed to create student");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null) return NotFound();

            _context.Students.Remove(student);
            var result = await _context.SaveChangesAsync();

            return result > 0 ? Ok() : BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, Student updatedStudent)
        {
            var studentBd = await _context.Students.FindAsync(id);
            if (studentBd == null) return NotFound();
            studentBd.Name = updatedStudent.Name;
            studentBd.Address = updatedStudent.Address;
            studentBd.Email = updatedStudent.Email;
            studentBd.PhoneNumber = updatedStudent.PhoneNumber;

            var result = await _context.SaveChangesAsync();
            return result > 0 ? Ok(studentBd) : BadRequest("Failed to update student");
        }

    }
}